import JWT from "jsonwebtoken"


export const generarJWT = (uid) => {

    return new Promise((resolve, reject) => {

        const payload = {
            uid
        }

        JWT.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '12h'
        }, (err, token) => {

            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(token);
            }

        });
    })

}