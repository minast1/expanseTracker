import { createCookieSessionStorage } from "@remix-run/node";


// export the whole sessionStorage object
export let sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "_session", // use any name you want here
    sameSite: "lax", // this helps with CSRF
    path: "/", // remember to add this so the cookie will work in all routes
    httpOnly: true, // for security reasons, make this cookie http only
    secrets: ["$1$eLE.LbFf$Sv9ObwgWGVokYe145X4AA/"] , // replace this with an actual secre
    secure: process.env.NODE_ENV === "production", // enable this in prod only
    //maxAge: 5
  },

});
 
// you can also export the methods individually for your own usage
export let { getSession, commitSession, destroySession } = sessionStorage;