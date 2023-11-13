import { ticketsModel } from "../ticket.model.js";

class TicketManager{
    constructor(){
        this.model = ticketsModel
    }

    async getAll() {
        let result;
    try {
        result = await this.model.find()
    } catch (error) {
        console.log(error)
    }

    return result;
    }

    async createTicket(ticket){
        let result;
        try {
            result = await this.model.create(ticket)
        } catch (error) {
            console.log(error)
        }
        return result
    }
}

export default TicketManager;