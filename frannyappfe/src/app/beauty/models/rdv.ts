import { Timestamp } from "rxjs"

export interface Rendezvous {
    rdv_id?: number,
    client_name: string,
    client_phone: number,
    client_email: string,
    rdvdate: string,
    doneby: number,
    prestation: number,
    category:string,
    rdvstate: string,
    rdvcode: string,
    rdv_price: string,
    ville: string,
    quartier: string,
    comments: string,
    rdvtype:string,
    title?: string,
    // price:number,
    created_at:Date
    cancellation_reason:string,
    bname:string,
    is_review:boolean
}