package database

import (
	"context"
	"log"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var Client *mongo.Client

func ConnectDB() {
	uri := os.Getenv("MONGO_URI")
	if uri == "" {
		uri = "mongodb://localhost:27017"
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	client, err := mongo.Connect(ctx, options.Client().ApplyURI(uri))
	if err != nil {
		log.Fatal("Gagal koneksi ke MongoDB:", err)
	}

	// Ping database untuk memastikan koneksi jalan
	err = client.Ping(ctx, nil)
	if err != nil {
		log.Fatal("MongoDB tidak merespon:", err)
	}

	log.Println("✅ Berhasil terhubung ke MongoDB!")
	Client = client
}

// Fungsi pembantu untuk mengambil koleksi
func GetCollection(collectionName string) *mongo.Collection {
	return Client.Database("pricepoint_db").Collection(collectionName)
}