import {NextResponse} from 'next/server'
import jwt_decode from "jwt-decode";

export function middleware(req, ev) {
    const response = NextResponse.next()
    const url = req.nextUrl.clone()
    url.pathname = '/login';
    if (req.cookies.accessToken && req.cookies.uid) {
        const accessToken = req.cookies.accessToken
        const uid = req.cookies.uid
        const userInfoHeader = jwt_decode(accessToken, {header: true})
        const userInfo = jwt_decode(accessToken)
        const currentTime = Math.round(new Date().getTime() / 1000)
        const {alg, kid} = userInfoHeader;
        const {iss, aud, sub, iat, exp} = userInfo;
        if (alg !== 'RS256' || ["697d7fb5dcde8cd048d3c9158b620b6910522b4d", "bebf100eadda332ec8fea57f9b5bc3a6ab29f555"].indexOf(kid) < 0) {
            console.log('vao 1')
            response.clearCookie('accessToken')
            response.clearCookie('uid')
            return NextResponse.redirect(url)
        }
        if (iss !== 'https://securetoken.google.com/mojarib-bss' || aud !== 'mojarib-bss' || sub !== uid || iat > currentTime || exp < currentTime) {
            console.log('vao 2')
            response.clearCookie('accessToken')
            response.clearCookie('uid')
            return NextResponse.redirect(url, 301).clearCookie('accessToken').clearCookie('uid');
        }
    }
    else {
        console.log('vao 3')
        response.clearCookie('accessToken')
        response.clearCookie('uid')
        return NextResponse.redirect(url, 301).clearCookie('accessToken').clearCookie('uid');
    }
    return NextResponse.next();
}