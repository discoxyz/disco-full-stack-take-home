export interface Profile {
  name?: string;
  bio?: string;
  avatar?: string;
  banner?: string;
}

export interface AccountLinkage {
  protocol: string;
  host: string;
  /** e.g. username*/
  id: string;
  /** e.g. URL of tweet */
  claim: string;
  attestations: { "did-json-vc": string }[];
}

export interface UserData {
  profile?: Profile;
  linkages?: {
    twitter?: AccountLinkage;
  };
}

export interface DIDType {
  did:string;
}
