const catchAsyncErrors = require("../middlewares/catchAsyncErrors.js");
const querystring = require('querystring');
const axios = require("axios")


exports.generateToken = catchAsyncErrors(async (req, res, next) => {
    // generate token api
    const params = new URLSearchParams()
    params.append('grant_type', 'client_credentials')
    params.append('client_id', 'l768f3dc87e40741dd88c3efd18e776583')
    params.append('client_secret', '658b09e5765c4fb189ccd5eafa2b894c')


    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': '*'
        }
    }

    await axios.post("https://apis-sandbox.fedex.com/oauth/token", params, config)
        .then(function (response) {
            // console.log(response.data.access_token)

            // console.log(response)

            // save token in cookie
            // res.cookie("token", response.data.access_token, {
            //     expires: new Date(
            //         Date.now() + 1 * 24 * 60 * 60 * 1000
            //     ),
            //     httpOnly: true,
            // });

            //send response
            res.status(201).json({
                success: true,
                data: response.data.access_token,

            })

        });


})






exports.TrackStatus = catchAsyncErrors(async (req, res, next) => {
    //get token from headers
    const { token } = req.headers;
    const data = req.body;
    //console.log(data)
    // console.log(token)



    const databody = {
        "trackingInfo": [
            {
                "trackingNumberInfo": data,
            }
        ],
        "includeDetailedScans": true
    }

    const config = {
        headers: {
            'Content-Type': "application/json",
            'authorization': (`Bearer ${token}`),
        }
    }
    await axios.post("https://apis-sandbox.fedex.com/track/v1/trackingnumbers", databody, config)
        .then(function (response) {
            // console.log("resssssss", response);

            res.status(201).json({
                success: true,
                data: response.data,

            });
        }).catch((err) => {
            // console.log("err", err)
            res.send(err)
        })

})
