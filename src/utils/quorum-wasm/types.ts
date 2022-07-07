export interface INodeInfo {
  node_id?: string
  node_publickey?: string
  node_status?: string
  node_type?: string
  node_version?: string
  peers?: any
}

export interface ICreateGroupParams {
  group_name: string
  consensus_type: string
  encryption_type: string
  app_key: string
}

export interface ICreateGroupResult {
  genesis_block: GenesisBlock
  group_id: string
  group_name: string
  owner_pubkey: string
  consensus_type: string
  encryption_type: string
  cipher_key: string
  app_key: string
  signature: string
}

export interface GenesisBlock {
  BlockId: string
  GroupId: string
  ProducerPubKey: string
  Hash: string
  Signature: string
  TimeStamp: string
}

export interface IGroupsInfo {
  groups?: Group[]
}

export interface Group {
  group_id?: string
  group_name?: string
  owner_pubkey?: string
  user_pubkey?: string
  user_eth_addr?: string
  consensus_type?: string
  encryption_type?: string
  cipher_key?: string
  app_key?: string
  last_updated?: number
  highest_height?: number
  highest_block_id?: string
  group_status?: string
  snapshot_info?: null
}

export interface GroupContent {
  TrxId?:     string;
  Publisher?: string;
  Content?:   Content;
  TypeUrl?:   string;
  TimeStamp?: number;
}

export interface Content {
  type?:    string;
  content?: string;
  name?:    string;
}

