import {Controller} from "@tsed/di";
import {Get, Post, Summary} from "@tsed/schema";
import { BodyParams, PathParams } from "@tsed/common";
import { DidService } from "../services/DidService";
import {DIDType, Profile } from "../types";
import { getProfileFromCeramic } from "../common/ceramic-util";
import { Did } from "src/entity/Did";

@Controller("/did")
export class GetProfileController {

  constructor(private readonly DidService: DidService) {}

  @Get("/getAllDids")
  @Summary("Return the DIDs of all Disco users")
  async getAllDids(): Promise<string[]> {
    const result = await this.DidService.getAllDids();
    return result.map(r => r.did);
  }

  @Post("/register")
  @Summary("Register the given DID as a Disco user")
  async registerDid(@BodyParams() body: DIDType): Promise<boolean> {
    await this.DidService.registerDid(body.did);
    return true;
  }

  @Get("/getProfileViaDid/:did")
  @Summary("Retrive the profile for a given DID")
  async getProfileViaDid(@PathParams("did") did: string): Promise<Profile | undefined> {
    return await getProfileFromCeramic(did)
  }


  @Post("/getDidViaId")
  @Summary("Get the given DID as a Disco user")
  async getDidViaId(@BodyParams() body: DIDType): Promise<string|null> {
    return await this.DidService.getDidViaId(body.did);
  }

  @Get("/getAllProfiles")
  @Summary("Retrive the profiles of all Disco users")
  async getAllProfiles(): Promise<Profile[]> {

    const result = await this.DidService.getAllDids();
    const profiles = result.filter(Boolean).map(async (i:Did) => {
      const c = await getProfileFromCeramic(i.did);
      return {...c, ...i}
    });
    return await Promise.all(profiles) as Profile[]
  }

}
