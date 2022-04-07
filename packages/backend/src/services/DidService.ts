import {Injectable} from "@tsed/di";
import {TypeORMService} from "@tsed/typeorm";
import {Connection} from "typeorm";
import { DidRepository } from "../repositories/DidRepository";
import { Did } from "../entity/Did";

@Injectable()
export class DidService {
  private connection: Connection;

  constructor(
    private typeORMService: TypeORMService,
    public DidRepository: DidRepository,
  ) {
  
  }

  $afterRoutesInit() {
    this.connection = this.typeORMService.get("default")!;
  }

  async registerDid(did: string): Promise<boolean> {
    const newDid = new Did();
    newDid.id = did;
    newDid.did = did;
    await this.connection.manager.save(newDid);
    return true;
  }

  async getDidViaId(id:string): Promise<string|null>{
    const result = await this.DidRepository.findOne({
      where:{id}
    })
    if(result){
      const {did}:any = result;
      return did 
    }
    return null
  }
  
  async getAllDids(): Promise<Did[]> {
    const users = await this.DidRepository.findAllDids();
    return users;
  }
}