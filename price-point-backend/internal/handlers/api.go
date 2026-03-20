package handlers

import (
	"context"
	"net/http"
	"price-point-backend/internal/auth"
	"price-point-backend/internal/database"
	"price-point-backend/internal/models"
	"time"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"golang.org/x/crypto/bcrypt"
)

func Register(c *gin.Context) {
	var user models.User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Input tidak valid"})
		return
	}

	collection := database.GetCollection("users")

	// --- FINISHING TOUCH: CEK EMAIL GANDA ---
	var existingUser models.User
	err := collection.FindOne(context.Background(), bson.M{"email": user.Email}).Decode(&existingUser)
	if err == nil {
		c.JSON(http.StatusConflict, gin.H{"error": "Email sudah terdaftar"})
		return
	}

	// Hash Password
	hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	user.Password = string(hashedPassword)

	res, err := collection.InsertOne(context.Background(), user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal mendaftar"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Berhasil mendaftar", "id": res.InsertedID})
}

func Login(c *gin.Context) {
	var input models.User
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Input tidak valid"})
		return
	}

	var foundUser models.User
	collection := database.GetCollection("users")
	err := collection.FindOne(context.Background(), bson.M{"email": input.Email}).Decode(&foundUser)
	if err != nil {
		// Gunakan pesan generik untuk keamanan (mencegah user enumeration)
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Email atau password salah"})
		return
	}

	err = bcrypt.CompareHashAndPassword([]byte(foundUser.Password), []byte(input.Password))
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Email atau password salah"})
		return
	}

	token, _ := auth.GenerateToken(foundUser.ID.Hex())
	c.JSON(http.StatusOK, gin.H{"message": "Login sukses", "token": token})
}

func SaveSimulation(c *gin.Context) {
	var sim models.Simulation
	if err := c.ShouldBindJSON(&sim); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Input tidak valid"})
		return
	}

	userID, _ := c.Get("userID")
	sim.UserID = userID.(string)
	
	// --- FINISHING TOUCH: KONSISTENSI WAKTU UTC ---
	sim.CreatedAt = primitive.NewDateTimeFromTime(time.Now().UTC())

	collection := database.GetCollection("simulations")
	res, err := collection.InsertOne(context.Background(), sim)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal menyimpan data"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Simulasi berhasil disimpan", "id": res.InsertedID})
}

func GetHistory(c *gin.Context) {
	userID, exists := c.Get("userID")
	if !exists || userID == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Tidak ada akses"})
		return
	}

	collection := database.GetCollection("simulations")
	
	// Sort berdasarkan waktu terbaru (CreatedAt: -1)
	opts := bson.M{"user_id": userID}
	cursor, err := collection.Find(context.Background(), opts)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal mengambil data"})
		return
	}
	defer cursor.Close(context.Background())

	var simulations []models.Simulation
	if err = cursor.All(context.Background(), &simulations); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Gagal membaca data"})
		return
	}

	if simulations == nil {
		simulations = []models.Simulation{}
	}

	c.JSON(http.StatusOK, gin.H{"data": simulations})
}