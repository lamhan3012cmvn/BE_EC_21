import CheckRole from "../Services/CheckRole.Services"

export default class RoleInstance{
  private static instance: CheckRole

    private constructor(){}

    static getInstance() {
        if(!this.instance){
          this.instance = new CheckRole()
        }
        return this.instance
    }
}