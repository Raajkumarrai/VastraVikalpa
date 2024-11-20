const axios = require("axios");

const checkIsSuccess = async (req, res, next) => {
  try {
    const { pid, totalAmount, scd } = req.params;

    const response = await axios.get(
      `https://uat.esewa.com.np/api/epay/txn_status/v2?pid=${pid}&totalAmount=${totalAmount}&scd=${scd}`
    );

    const responseData = response.data;

    if (responseData.status === "COMPLETE" && responseData.refId) {
      req.paymentData = {
        pid: responseData.pid,
        totalAmount: responseData.totalAmount,
        refId: responseData.refId,
        scd: responseData.scd,
        status: responseData.status,
      };
      next();
    } else {
      return res.status(400).json({ error: "Payment verification failed" });
    }
  } catch (error) {}
};

module.exports = checkIsSuccess;
