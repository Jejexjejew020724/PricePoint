package calculator

import "github.com/shopspring/decimal"

// Input dari user (Frontend)
type SimulationInput struct {
	HPP        decimal.Decimal `json:"hpp"`
	Opex       decimal.Decimal `json:"opex"`
	Margin     decimal.Decimal `json:"margin"` // Contoh: 0.20 untuk 20%
	IncludeTax bool            `json:"include_tax"`
}

// Output yang dikembalikan ke Frontend
type SimulationResult struct {
	TotalCost      decimal.Decimal `json:"total_cost"`
	PriceBeforeTax decimal.Decimal `json:"price_before_tax"`
	TaxAmount      decimal.Decimal `json:"tax_amount"`
	FinalPrice     decimal.Decimal `json:"final_price"`
}

func CalculatePrice(input SimulationInput) SimulationResult {
	// --- FINISHING TOUCH: VALIDASI INPUT ---
	// Mencegah angka negatif
	if input.HPP.IsNegative() { input.HPP = decimal.Zero }
	if input.Opex.IsNegative() { input.Opex = decimal.Zero }
	if input.Margin.IsNegative() { input.Margin = decimal.Zero }
	
	// Mencegah pembagian dengan nol jika margin >= 100% (1.0)
	one := decimal.NewFromInt(1)
	if input.Margin.GreaterThanOrEqual(one) {
		input.Margin = decimal.NewFromFloat(0.99) // Limit maksimal 99% agar sistem tidak crash
	}
	// ----------------------------------------

	// 1. Hitung Total Biaya (HPP + Opex)
	totalCost := input.HPP.Add(input.Opex)

	// 2. Hitung Harga Sebelum Pajak = Total Biaya / (1 - Margin)
	marginFactor := one.Sub(input.Margin)
	
	var priceBeforeTax decimal.Decimal
	// marginFactor pasti positif karena sudah divalidasi di atas
	priceBeforeTax = totalCost.Div(marginFactor)

	// 3. Hitung Pajak (PPN 12% sesuai regulasi 2026) jika diaktifkan
	taxAmount := decimal.Zero
	if input.IncludeTax {
		taxRate := decimal.NewFromFloat(0.12)
		taxAmount = priceBeforeTax.Mul(taxRate)
	}

	// 4. Hitung Harga Jual Akhir
	finalPrice := priceBeforeTax.Add(taxAmount)

	// Kembalikan hasil dengan pembulatan 2 angka di belakang koma
	return SimulationResult{
		TotalCost:      totalCost.Round(2),
		PriceBeforeTax: priceBeforeTax.Round(2),
		TaxAmount:      taxAmount.Round(2),
		FinalPrice:     finalPrice.Round(2),
	}
}