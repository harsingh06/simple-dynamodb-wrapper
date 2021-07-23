import { DocumentClient } from "aws-sdk/clients/dynamodb";

interface IBaseParams {
    TableName: String
    Key: {
        [keyName: string]: String
    }
}

class Wrapper {
    readonly _tableName: string;
    readonly _partitionKey: string;
    readonly _sortKey?: string;
    readonly _dbClient;
    readonly _baseParams: IBaseParams;
    
    /**
     * Wrapper Constractor
     */
    constructor(tableName: string, partitionKey: string, sortKey?: string) {
        this._tableName = tableName
        this._partitionKey = partitionKey;

        this._dbClient = new DocumentClient();

        this._baseParams = {
            TableName: this._tableName,
            Key: {
                partitionKey: undefined
            }
        }

        if(sortKey) { 
            this._sortKey = sortKey 
            this._baseParams.Key[sortKey] = undefined
        }
    }

    scan() {
        return this._dbClient.scan({
            TableName: this._tableName
        })
        .promise()
        .then(data => {
            return data;
        })
        .catch(err => {
            throw err;
        });
    }
    
    get(paritionKeyValue: String, sortKeyValue: String) {
            return this._dbClient.query(this._baseParams)
        .promise()
        .then(data => {
            return data;
        })
        .catch(err => {
            throw err;
        });
    } 

    put(data: any) {
        return this._dbClient.put({
            TableName: this._tableName,
            Item: data
        })
        .promise()
        .then(data => {
            return data;
        })
        .catch(err => {
            throw err;
        });
    }

    delete() {
        return this._dbClient.delete(this._baseParams)
        .promise()
        .then(data => {
            return data;
        })
        .catch(err => {
            throw err;
        });
    }
}