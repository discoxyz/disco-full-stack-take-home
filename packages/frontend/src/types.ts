/** Quick n dirty VC type with properties we need, the full W3C VC spec has much much more. */
export interface VC {
  "@context": string | string[];
  id?: string;
  type: string[];
  issuer: string | { id: string; [key: string]: any };
  issuanceDate: string;
  expirationDate?: string;
  credentialSubject: { [key: string]: any };
  proof?: {
    type?: string;
    jwt?: string;
    proofValue?: string;
    created?: string;
    eip712Domain?: { [key: string]: any };
    proofPurpose?: string;
    verificationMethod?: string;
  };
  credentialSchema?: {
    id: string;
    type: string;
  };
}

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
  creds?: VC[];
  linkages?: {
    twitter?: AccountLinkage;
  };
}


export interface DIDType {
  id?: string;
  did?:string;
}

export interface RequestInit {}