export interface INodeInfo {
  nodeID?:        string;
  nodePublickey?: string;
  nodeStatus?:    string;
  nodeType?:      string;
  nodeVersion?:   string;
  peers?:         any;
}

export interface ICreateGroupParams {
  groupName:      string;
  consensusType:  string;
  encryptionType: string;
  appKey:         string;
}

export interface ICreateGroupResult {
  genesisBlock:   GenesisBlock;
  groupID:        string;
  groupName:      string;
  ownerPubkey:    string;
  consensusType:  string;
  encryptionType: string;
  cipherKey:      string;
  appKey:         string;
  signature:      string;
}

export interface GenesisBlock {
  blockID:        string;
  groupID:        string;
  producerPubKey: string;
  hash:           string;
  signature:      string;
  timeStamp:      string;
}


export interface IGroupsInfo {
  groups?: Group[];
}

export interface Group {
  groupID?:        string;
  groupName?:      string;
  ownerPubkey?:    string;
  userPubkey?:     string;
  userEthAddr?:    string;
  consensusType?:  string;
  encryptionType?: string;
  cipherKey?:      string;
  appKey?:         string;
  lastUpdated?:    number;
  highestHeight?:  number;
  highestBlockID?: string;
  groupStatus?:    string;
  snapshotInfo?:   null;
}
