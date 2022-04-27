import { initializeApp, cert, getApps, getApp} from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";
 
let app; 
try {
    
        app = getApps().length === 0 ?
            initializeApp({
                credential: cert({
                    projectId: "crimemanagement-92b8c",
                    clientEmail: "firebase-adminsdk-85ycg@crimemanagement-92b8c.iam.gserviceaccount.com",
                    // replace `\` and `n` character pairs w/ single `\n` character
                    privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCVBZKVjnEJOCeS\nPKjbnv4u8xhn+t3qSQ7A8RtxD8OcNgiZLkKkw5QyN5/H3IaNPeHStvP6WTC5o4LB\nKt6mO2qm5uK2xkvmecTkj2MNSoeQm/+5fVNH0o3eufLfL1voPjAT/dFyb7ViWaPD\nc6igHxMGM0iBMAzTjmB1cwJXiK5j+cJe3qMK1DJ2acZistElYX+EtMLCTDujuecW\nNN55MqIhOKAi9XDem7dQ6xKyIbYiDqSMdkXtJoxeRZCt26wP1LnB6RKnp+u2fiQf\no67d3774IPk8p1o55hnZD74h3o1w7ZHXzhuZnybIV00R4QpnukWANtJt+g8TeV7V\nQnOTsgaRAgMBAAECggEAFA+LpmhmHRNFzcYusQnxNnQb0qY5yM027ZBHh8EogwHf\nHHKBdC6ukigHcV86xGQSifbTrIg51UkGqWb8/AG+9LgwyDa03FIuHYU+lKPLe2hp\n/21jOvru2uR1+8d4pttK8OtX46uCuQ+kyliVLaD2mFIVA5cVUvFgA3o3qX2ehESp\nVZ4c31dGcHN9GS5guJg6DVr5EHdBcBEE6mZdSbf3iFP4E9tbk8ahSTxpS80Mb6q2\np5hnRrqCseLfo1WSHuH7sBHx4aZOmcxFCfwJ7TNDRJ+APbFO5wOJLC9W12fBwzmk\nwHbjltHQktJ2BAhPzwZecDdOXi2xZDXWcuAqJjwctQKBgQDN8guPvr2ZdxUVgqRT\nkJVZklCna/5WRNpgzwdZyHRVNnbQ5FQAcI9ku61+DVg7hJh2hrVvIomt0d2eQI41\nFdNktBTwmzw+ON+tsMHjKnonwiyyYbYEF1EVJIcgwhl3cNpoZ5g/hJ23mb1l+76d\nfRIYji4PXplAOKNOOb+ns57OawKBgQC5PbnnN2x3U3G9mChHsmzz7GwkXjxuLXtv\nUC8zYbFj4WYh2ikDvKtTY8FrbtpwAMYTBwdCC4zIDujCPhrTeuqOdVMVv059Hamj\nlhd9ajgvNN4wXHqtYXMmWp+RDxCuQ5sH8wLk5u8OEmBE+NY9in+MMTFg/KuAU8YE\nv2qf0MQF8wKBgHjESlFV2dsHgL6naHN0YpAvA8rZwkCWibShUr8slENv98bRTg0f\n9IZuo/M6IhZsz/cZUYXFLBVY7uuhEYNBtD/mdi0N6wrV0R0KfPgYbZ+o9wr3z4Og\npLSQQglMqSBodjspHJeKze3fYrhOIt45fIYXwhzTLW0CiYkSxjeyVhrXAoGAalpp\nMLoeeUgcZolEnx1u9oEH+b1tHqjYVKmJ4As36KuRkuAJak7ZYrBEbaUgnuuizWvc\nm+u7sWT1+AfmKQNKRe5QfIzwyF7OddCHvgbNKTVGWCfQe1kW3q9rK8Klhhfkm6TH\nRZrdJ4wfX5oqjvzEjD32JsQKx0vRxgoMcqNO2EcCgYAHdb1C7/UyXXkn25wNVvRI\nTeHyuP4IUCoZ5fN5b8d6gTsZxgkuJ4ODLTTytw65uosG4vaXWLlBV0I3Dvd+LHoM\n4z0pshFgZ1+NeUbhrPFzLsMfGXYtKtUvNsvIpMEzCQ9/26F7uL3DrxgUHZcr04Bz\nyD31tAIIws2JOFrkwkCSmQ==\n-----END PRIVATE KEY-----\n",
        
                }),
                storageBucket: "crimemanagement-92b8c.appspot.com",
            }) : getApp();
       
    } catch (error) {
        console.log("Failed to initialize App: " + error)
    } 


const bucket = getStorage().bucket(); 
export { bucket, app};
