const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());

app.use(express.json());

const promotionCodes = {
  VA50: 0.5,
  SUMMER20: 0.2,
};

app.post("/promotion", (req, res) => {
  const { code, totalPrice } = req.body;

  if (isNaN(totalPrice)) {
    return res.json({
      success: false,
      message: "Invalid total price",
    });
  }

  if (promotionCodes[code]) {
    const discount = promotionCodes[code];
    const discountedPrice = totalPrice * (1 - discount);

    res.json({
      success: true,
      discount: discount * 100,
      discountedPrice: Number(discountedPrice.toFixed(2)),
    });
  } else {
    res.json({
      success: false,
      message: "Invalid promotion code",
    });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
