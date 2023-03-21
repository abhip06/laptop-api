import axios from "axios";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
// import ErrorHandler from "../utils/errorHandler.js";

export const prediction = catchAsyncError(async (req, res, next) => {
    const { company, type, ram, weight, touchScreen, ips, screenSize, screenResolution, cpu, hdd, ssd, gpu, os } = req.body;

    console.log(req.body)

    // if (!company || !type || !ram || !weight || !touchScreen || !ips || !screenSize || !screenResolution || !cpu || !hdd || !ssd || !gpu || !os) return next(new ErrorHandler("Please enter all fields.", 400));

    const baseUrl = process.env.BASE_URL;

    const apiUrl = `/predict?company=${company}&type=${type}&ram=${ram}&weight=${weight}&touchScreen=${touchScreen}&ips=${ips}&screenSize=${screenSize}&screenResolution=${screenResolution}&cpu=${cpu}&hdd=${hdd}&ssd=${ssd}&gpu=${gpu}&os=${os}`;

    const url = baseUrl + apiUrl;

    const result = await axios.get(url);

    res.status(200).json({
        success: true,
        predictedValue: result.data,
    });
});