import {Controller} from "@tsed/di";
import {Get, Post, Summary} from "@tsed/schema";
import { PathParams } from "@tsed/common";
import { DidService } from "../services/DidService";
import { Did } from "../entity/Did";
import { Profile } from "../types";
import { getProfileFromCeramic } from "../common/ceramic-util";

@Controller("/did")
export class GetProfileController {

  constructor(private readonly didService: DidService) {

  }

  @Get("/getAllDids")
  @Summary("Return the DIDs of all Disco users")
  async getAllDids(): Promise<string[]> {
    const result = await this.didService.getAllDids();
    return result.map(r => r.did);
  }

  @Post("/register/:did")
  @Summary("Register the given DID as a Disco user")
  async registerDid(@PathParams("did") did: string): Promise<boolean> {
    const dids = await this.getAllDids();
    if (dids.find((entry) => {return entry === did})) return true;
    return this.didService.registerDid(did);
  }

  @Get("/getProfileViaDid/:did")
  @Summary("Retrieve the profile for a given DID")
  async getProfileViaDid(@PathParams("did") did: string): Promise<Profile | undefined> {
    return getProfileFromCeramic(did);
  }

  @Get("/getAllProfiles")
  @Summary("Retrieve the profiles of all Disco users")
  async getAllProfiles(): Promise<Profile[]> {
    const profiles : Profile[] = [];
    const dids : Did[] = await this.didService.getAllDids();
    for (const did of dids) {
      const profile = await getProfileFromCeramic(did.did);
      if (profile) profiles.push(profile);
    }
    return profiles;
  }

}
