package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	ID       primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	Email    string             `bson:"email" json:"email"`
	Password string             `bson:"password" json:"-"` // "-" agar password tidak ikut terkirim ke frontend
}

type Simulation struct {
	ID             primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	UserID         string             `bson:"user_id,omitempty" json:"user_id"` // Kosong jika Guest
	ProductName    string             `bson:"product_name" json:"product_name"`
	HPP            float64            `bson:"hpp" json:"hpp"`
	Opex           float64            `bson:"opex" json:"opex"`
	Margin         float64            `bson:"margin" json:"margin"`
	FinalPrice     float64            `bson:"final_price" json:"final_price"`
	CreatedAt      primitive.DateTime `bson:"created_at" json:"created_at"`
}