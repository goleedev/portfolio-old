"use strict";
exports.id = 726;
exports.ids = [726];
exports.modules = {

/***/ 8901:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "s": () => (/* binding */ Redis)
});

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/error.js
/**
 * Result of a bad request to upstash
 */ class UpstashError extends Error {
    constructor(message){
        super(message);
        this.name = "UpstashError";
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/util.js
function parseRecursive(obj) {
    const parsed = Array.isArray(obj) ? obj.map((o)=>{
        try {
            return parseRecursive(o);
        } catch  {
            return o;
        }
    }) : JSON.parse(obj);
    /**
     * Parsing very large numbers can result in MAX_SAFE_INTEGER
     * overflow. In that case we return the number as string instead.
     */ if (typeof parsed === "number" && parsed.toString() != obj) {
        return obj;
    }
    return parsed;
}
function parseResponse(result) {
    try {
        /**
         * Try to parse the response if possible
         */ return parseRecursive(result);
    } catch  {
        return result;
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/command.js


const defaultSerializer = (c)=>{
    switch(typeof c){
        case "string":
        case "number":
        case "boolean":
            return c;
        default:
            return JSON.stringify(c);
    }
};
/**
 * Command offers default (de)serialization and the exec method to all commands.
 *
 * TData represents what the user will enter or receive,
 * TResult is the raw data returned from upstash, which may need to be transformed or parsed.
 */ class Command {
    /**
     * Create a new command instance.
     *
     * You can define a custom `deserialize` function. By default we try to deserialize as json.
     */ constructor(command, opts){
        Object.defineProperty(this, "command", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "serialize", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "deserialize", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.serialize = defaultSerializer;
        this.deserialize = typeof opts?.automaticDeserialization === "undefined" || opts.automaticDeserialization ? opts?.deserialize ?? parseResponse : (x)=>x;
        this.command = command.map((c)=>this.serialize(c));
    }
    /**
     * Execute the command using a client.
     */ async exec(client) {
        const { result , error  } = await client.request({
            body: this.command
        });
        if (error) {
            throw new UpstashError(error);
        }
        if (typeof result === "undefined") {
            throw new Error("Request did not return a result");
        }
        return this.deserialize(result);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/append.js

/**
 * @see https://redis.io/commands/append
 */ class AppendCommand extends Command {
    constructor(cmd, opts){
        super([
            "append",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/bitcount.js

/**
 * @see https://redis.io/commands/bitcount
 */ class BitCountCommand extends Command {
    constructor([key, start, end], opts){
        const command = [
            "bitcount",
            key
        ];
        if (typeof start === "number") {
            command.push(start);
        }
        if (typeof end === "number") {
            command.push(end);
        }
        super(command, opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/bitop.js

/**
 * @see https://redis.io/commands/bitop
 */ class BitOpCommand extends Command {
    constructor(cmd, opts){
        super([
            "bitop",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/bitpos.js

/**
 * @see https://redis.io/commands/bitpos
 */ class BitPosCommand extends Command {
    constructor(cmd, opts){
        super([
            "bitpos",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/dbsize.js

/**
 * @see https://redis.io/commands/dbsize
 */ class DBSizeCommand extends Command {
    constructor(opts){
        super([
            "dbsize"
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/decr.js

/**
 * @see https://redis.io/commands/decr
 */ class DecrCommand extends Command {
    constructor(cmd, opts){
        super([
            "decr",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/decrby.js

/**
 * @see https://redis.io/commands/decrby
 */ class DecrByCommand extends Command {
    constructor(cmd, opts){
        super([
            "decrby",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/del.js

/**
 * @see https://redis.io/commands/del
 */ class DelCommand extends Command {
    constructor(cmd, opts){
        super([
            "del",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/echo.js

/**
 * @see https://redis.io/commands/echo
 */ class EchoCommand extends Command {
    constructor(cmd, opts){
        super([
            "echo",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/eval.js

/**
 * @see https://redis.io/commands/eval
 */ class EvalCommand extends Command {
    constructor([script, keys, args], opts){
        super([
            "eval",
            script,
            keys.length,
            ...keys,
            ...args ?? []
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/evalsha.js

/**
 * @see https://redis.io/commands/evalsha
 */ class EvalshaCommand extends Command {
    constructor([sha, keys, args], opts){
        super([
            "evalsha",
            sha,
            keys.length,
            ...keys,
            ...args ?? []
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/exists.js

/**
 * @see https://redis.io/commands/exists
 */ class ExistsCommand extends Command {
    constructor(cmd, opts){
        super([
            "exists",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/expire.js

/**
 * @see https://redis.io/commands/expire
 */ class ExpireCommand extends Command {
    constructor(cmd, opts){
        super([
            "expire",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/expireat.js

/**
 * @see https://redis.io/commands/expireat
 */ class ExpireAtCommand extends Command {
    constructor(cmd, opts){
        super([
            "expireat",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/flushall.js

/**
 * @see https://redis.io/commands/flushall
 */ class FlushAllCommand extends Command {
    constructor(args, opts){
        const command = [
            "flushall"
        ];
        if (args && args.length > 0 && args[0].async) {
            command.push("async");
        }
        super(command, opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/flushdb.js

/**
 * @see https://redis.io/commands/flushdb
 */ class FlushDBCommand extends Command {
    constructor([opts], cmdOpts){
        const command = [
            "flushdb"
        ];
        if (opts?.async) {
            command.push("async");
        }
        super(command, cmdOpts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/get.js

/**
 * @see https://redis.io/commands/get
 */ class GetCommand extends Command {
    constructor(cmd, opts){
        super([
            "get",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/getbit.js

/**
 * @see https://redis.io/commands/getbit
 */ class GetBitCommand extends Command {
    constructor(cmd, opts){
        super([
            "getbit",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/getdel.js

/**
 * @see https://redis.io/commands/getdel
 */ class GetDelCommand extends Command {
    constructor(cmd, opts){
        super([
            "getdel",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/getrange.js

/**
 * @see https://redis.io/commands/getrange
 */ class GetRangeCommand extends Command {
    constructor(cmd, opts){
        super([
            "getrange",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/getset.js

/**
 * @see https://redis.io/commands/getset
 */ class GetSetCommand extends Command {
    constructor(cmd, opts){
        super([
            "getset",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/hdel.js

/**
 * @see https://redis.io/commands/hdel
 */ class HDelCommand extends Command {
    constructor(cmd, opts){
        super([
            "hdel",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/hexists.js

/**
 * @see https://redis.io/commands/hexists
 */ class HExistsCommand extends Command {
    constructor(cmd, opts){
        super([
            "hexists",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/hget.js

/**
 * @see https://redis.io/commands/hget
 */ class HGetCommand extends Command {
    constructor(cmd, opts){
        super([
            "hget",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/hgetall.js

function deserialize(result) {
    if (result.length === 0) {
        return null;
    }
    const obj = {};
    while(result.length >= 2){
        const key = result.shift();
        const value = result.shift();
        try {
            obj[key] = JSON.parse(value);
        } catch  {
            obj[key] = value;
        }
    }
    return obj;
}
/**
 * @see https://redis.io/commands/hgetall
 */ class HGetAllCommand extends Command {
    constructor(cmd, opts){
        super([
            "hgetall",
            ...cmd
        ], {
            deserialize: (result)=>deserialize(result),
            ...opts
        });
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/hincrby.js

/**
 * @see https://redis.io/commands/hincrby
 */ class HIncrByCommand extends Command {
    constructor(cmd, opts){
        super([
            "hincrby",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/hincrbyfloat.js

/**
 * @see https://redis.io/commands/hincrbyfloat
 */ class HIncrByFloatCommand extends Command {
    constructor(cmd, opts){
        super([
            "hincrbyfloat",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/hkeys.js

/**
 * @see https://redis.io/commands/hkeys
 */ class HKeysCommand extends Command {
    constructor([key], opts){
        super([
            "hkeys",
            key
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/hlen.js

/**
 * @see https://redis.io/commands/hlen
 */ class HLenCommand extends Command {
    constructor(cmd, opts){
        super([
            "hlen",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/hmget.js

function hmget_deserialize(fields, result) {
    if (result.length === 0 || result.every((field)=>field === null)) {
        return null;
    }
    const obj = {};
    for(let i = 0; i < fields.length; i++){
        try {
            obj[fields[i]] = JSON.parse(result[i]);
        } catch  {
            obj[fields[i]] = result[i];
        }
    }
    return obj;
}
/**
 * hmget returns an object of all requested fields from a hash
 * The field values are returned as an object like this:
 * ```ts
 * {[fieldName: string]: T | null}
 * ```
 *
 * In case the hash does not exist or all fields are empty `null` is returned
 *
 * @see https://redis.io/commands/hmget
 */ class HMGetCommand extends Command {
    constructor([key, ...fields], opts){
        super([
            "hmget",
            key,
            ...fields
        ], {
            deserialize: (result)=>hmget_deserialize(fields, result),
            ...opts
        });
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/hmset.js

/**
 * @see https://redis.io/commands/hmset
 */ class HMSetCommand extends Command {
    constructor([key, kv], opts){
        super([
            "hmset",
            key,
            ...Object.entries(kv).flatMap(([field, value])=>[
                    field,
                    value
                ])
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/hrandfield.js

function hrandfield_deserialize(result) {
    if (result.length === 0) {
        return null;
    }
    const obj = {};
    while(result.length >= 2){
        const key = result.shift();
        const value = result.shift();
        try {
            obj[key] = JSON.parse(value);
        } catch  {
            obj[key] = value;
        }
    }
    return obj;
}
/**
 * @see https://redis.io/commands/hrandfield
 */ class HRandFieldCommand extends Command {
    constructor(cmd, opts){
        const command = [
            "hrandfield",
            cmd[0]
        ];
        if (typeof cmd[1] === "number") {
            command.push(cmd[1]);
        }
        if (cmd[2]) {
            command.push("WITHVALUES");
        }
        super(command, {
            // @ts-ignore TODO:
            deserialize: cmd[2] ? (result)=>hrandfield_deserialize(result) : opts?.deserialize,
            ...opts
        });
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/hscan.js

/**
 * @see https://redis.io/commands/hscan
 */ class HScanCommand extends Command {
    constructor([key, cursor, cmdOpts], opts){
        const command = [
            "hscan",
            key,
            cursor
        ];
        if (cmdOpts?.match) {
            command.push("match", cmdOpts.match);
        }
        if (typeof cmdOpts?.count === "number") {
            command.push("count", cmdOpts.count);
        }
        super(command, opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/hset.js

/**
 * @see https://redis.io/commands/hset
 */ class HSetCommand extends Command {
    constructor([key, kv], opts){
        super([
            "hset",
            key,
            ...Object.entries(kv).flatMap(([field, value])=>[
                    field,
                    value
                ])
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/hsetnx.js

/**
 * @see https://redis.io/commands/hsetnx
 */ class HSetNXCommand extends Command {
    constructor(cmd, opts){
        super([
            "hsetnx",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/hstrlen.js

/**
 * @see https://redis.io/commands/hstrlen
 */ class HStrLenCommand extends Command {
    constructor(cmd, opts){
        super([
            "hstrlen",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/hvals.js

/**
 * @see https://redis.io/commands/hvals
 */ class HValsCommand extends Command {
    constructor(cmd, opts){
        super([
            "hvals",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/incr.js

/**
 * @see https://redis.io/commands/incr
 */ class IncrCommand extends Command {
    constructor(cmd, opts){
        super([
            "incr",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/incrby.js

/**
 * @see https://redis.io/commands/incrby
 */ class IncrByCommand extends Command {
    constructor(cmd, opts){
        super([
            "incrby",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/incrbyfloat.js

/**
 * @see https://redis.io/commands/incrbyfloat
 */ class IncrByFloatCommand extends Command {
    constructor(cmd, opts){
        super([
            "incrbyfloat",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/json_arrappend.js

/**
 * @see https://redis.io/commands/json.arrappend
 */ class JsonArrAppendCommand extends Command {
    constructor(cmd, opts){
        super([
            "JSON.ARRAPPEND",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/json_arrindex.js

/**
 * @see https://redis.io/commands/json.arrindex
 */ class JsonArrIndexCommand extends Command {
    constructor(cmd, opts){
        super([
            "JSON.ARRINDEX",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/json_arrinsert.js

/**
 * @see https://redis.io/commands/json.arrinsert
 */ class JsonArrInsertCommand extends Command {
    constructor(cmd, opts){
        super([
            "JSON.ARRINSERT",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/json_arrlen.js

/**
 * @see https://redis.io/commands/json.arrlen
 */ class JsonArrLenCommand extends Command {
    constructor(cmd, opts){
        super([
            "JSON.ARRLEN",
            cmd[0],
            cmd[1] ?? "$"
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/json_arrpop.js

/**
 * @see https://redis.io/commands/json.arrpop
 */ class JsonArrPopCommand extends Command {
    constructor(cmd, opts){
        super([
            "JSON.ARRPOP",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/json_arrtrim.js

/**
 * @see https://redis.io/commands/json.arrtrim
 */ class JsonArrTrimCommand extends Command {
    constructor(cmd, opts){
        const path = cmd[1] ?? "$";
        const start = cmd[2] ?? 0;
        const stop = cmd[3] ?? 0;
        super([
            "JSON.ARRTRIM",
            cmd[0],
            path,
            start,
            stop
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/json_clear.js

/**
 * @see https://redis.io/commands/json.clear
 */ class JsonClearCommand extends Command {
    constructor(cmd, opts){
        super([
            "JSON.CLEAR",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/json_del.js

/**
 * @see https://redis.io/commands/json.del
 */ class JsonDelCommand extends Command {
    constructor(cmd, opts){
        super([
            "JSON.DEL",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/json_forget.js

/**
 * @see https://redis.io/commands/json.forget
 */ class JsonForgetCommand extends Command {
    constructor(cmd, opts){
        super([
            "JSON.FORGET",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/json_get.js

/**
 * @see https://redis.io/commands/json.get
 */ class JsonGetCommand extends Command {
    constructor(cmd, opts){
        const command = [
            "JSON.GET"
        ];
        if (typeof cmd[1] === "string") {
            // @ts-ignore - we know this is a string
            command.push(...cmd);
        } else {
            command.push(cmd[0]);
            if (cmd[1]) {
                if (cmd[1].indent) {
                    command.push("INDENT", cmd[1].indent);
                }
                if (cmd[1].newline) {
                    command.push("NEWLINE", cmd[1].newline);
                }
                if (cmd[1].space) {
                    command.push("SPACE", cmd[1].space);
                }
            }
            // @ts-ignore - we know this is a string
            command.push(...cmd.slice(2));
        }
        super(command, opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/json_mget.js

/**
 * @see https://redis.io/commands/json.mget
 */ class JsonMGetCommand extends Command {
    constructor(cmd, opts){
        super([
            "JSON.MGET",
            ...cmd[0],
            cmd[1]
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/json_numincrby.js

/**
 * @see https://redis.io/commands/json.numincrby
 */ class JsonNumIncrByCommand extends Command {
    constructor(cmd, opts){
        super([
            "JSON.NUMINCRBY",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/json_nummultby.js

/**
 * @see https://redis.io/commands/json.nummultby
 */ class JsonNumMultByCommand extends Command {
    constructor(cmd, opts){
        super([
            "JSON.NUMMULTBY",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/json_objkeys.js

/**
 * @see https://redis.io/commands/json.objkeys
 */ class JsonObjKeysCommand extends Command {
    constructor(cmd, opts){
        super([
            "JSON.OBJKEYS",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/json_objlen.js

/**
 * @see https://redis.io/commands/json.objlen
 */ class JsonObjLenCommand extends Command {
    constructor(cmd, opts){
        super([
            "JSON.OBJLEN",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/json_resp.js

/**
 * @see https://redis.io/commands/json.resp
 */ class JsonRespCommand extends Command {
    constructor(cmd, opts){
        super([
            "JSON.RESP",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/json_set.js

/**
 * @see https://redis.io/commands/json.set
 */ class JsonSetCommand extends Command {
    constructor(cmd, opts){
        const command = [
            "JSON.SET",
            cmd[0],
            cmd[1],
            cmd[2]
        ];
        if (cmd[3]) {
            if (cmd[3].nx) {
                command.push("NX");
            } else if (cmd[3].xx) {
                command.push("XX");
            }
        }
        super(command, opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/json_strappend.js

/**
 * @see https://redis.io/commands/json.strappend
 */ class JsonStrAppendCommand extends Command {
    constructor(cmd, opts){
        super([
            "JSON.STRAPPEND",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/json_strlen.js

/**
 * @see https://redis.io/commands/json.strlen
 */ class JsonStrLenCommand extends Command {
    constructor(cmd, opts){
        super([
            "JSON.STRLEN",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/json_toggle.js

/**
 * @see https://redis.io/commands/json.toggle
 */ class JsonToggleCommand extends Command {
    constructor(cmd, opts){
        super([
            "JSON.TOGGLE",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/json_type.js

/**
 * @see https://redis.io/commands/json.type
 */ class JsonTypeCommand extends Command {
    constructor(cmd, opts){
        super([
            "JSON.TYPE",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/keys.js

/**
 * @see https://redis.io/commands/keys
 */ class KeysCommand extends Command {
    constructor(cmd, opts){
        super([
            "keys",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/lindex.js

class LIndexCommand extends Command {
    constructor(cmd, opts){
        super([
            "lindex",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/linsert.js

class LInsertCommand extends Command {
    constructor(cmd, opts){
        super([
            "linsert",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/llen.js

/**
 * @see https://redis.io/commands/llen
 */ class LLenCommand extends Command {
    constructor(cmd, opts){
        super([
            "llen",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/lmove.js

/**
 * @see https://redis.io/commands/lmove
 */ class LMoveCommand extends Command {
    constructor(cmd, opts){
        super([
            "lmove",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/lpop.js

/**
 * @see https://redis.io/commands/lpop
 */ class LPopCommand extends Command {
    constructor(cmd, opts){
        super([
            "lpop",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/lpos.js

/**
 * @see https://redis.io/commands/lpos
 */ class LPosCommand extends Command {
    constructor(cmd, opts){
        const args = [
            "lpos",
            cmd[0],
            cmd[1]
        ];
        if (typeof cmd[2]?.rank === "number") {
            args.push("rank", cmd[2].rank);
        }
        if (typeof cmd[2]?.count === "number") {
            args.push("count", cmd[2].count);
        }
        if (typeof cmd[2]?.maxLen === "number") {
            args.push("maxLen", cmd[2].maxLen);
        }
        super(args, opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/lpush.js

/**
 * @see https://redis.io/commands/lpush
 */ class LPushCommand extends Command {
    constructor(cmd, opts){
        super([
            "lpush",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/lpushx.js

/**
 * @see https://redis.io/commands/lpushx
 */ class LPushXCommand extends Command {
    constructor(cmd, opts){
        super([
            "lpushx",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/lrange.js

class LRangeCommand extends Command {
    constructor(cmd, opts){
        super([
            "lrange",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/lrem.js

class LRemCommand extends Command {
    constructor(cmd, opts){
        super([
            "lrem",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/lset.js

class LSetCommand extends Command {
    constructor(cmd, opts){
        super([
            "lset",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/ltrim.js

class LTrimCommand extends Command {
    constructor(cmd, opts){
        super([
            "ltrim",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/mget.js

/**
 * @see https://redis.io/commands/mget
 */ class MGetCommand extends Command {
    constructor(cmd, opts){
        super([
            "mget",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/mset.js

/**
 * @see https://redis.io/commands/mset
 */ class MSetCommand extends Command {
    constructor([kv], opts){
        super([
            "mset",
            ...Object.entries(kv).flatMap(([key, value])=>[
                    key,
                    value
                ])
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/msetnx.js

/**
 * @see https://redis.io/commands/msetnx
 */ class MSetNXCommand extends Command {
    constructor([kv], opts){
        super([
            "msetnx",
            ...Object.entries(kv).flatMap((_)=>_)
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/persist.js

/**
 * @see https://redis.io/commands/persist
 */ class PersistCommand extends Command {
    constructor(cmd, opts){
        super([
            "persist",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/pexpire.js

/**
 * @see https://redis.io/commands/pexpire
 */ class PExpireCommand extends Command {
    constructor(cmd, opts){
        super([
            "pexpire",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/pexpireat.js

/**
 * @see https://redis.io/commands/pexpireat
 */ class PExpireAtCommand extends Command {
    constructor(cmd, opts){
        super([
            "pexpireat",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/ping.js

/**
 * @see https://redis.io/commands/ping
 */ class PingCommand extends Command {
    constructor(cmd, opts){
        const command = [
            "ping"
        ];
        if (typeof cmd !== "undefined" && typeof cmd[0] !== "undefined") {
            command.push(cmd[0]);
        }
        super(command, opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/psetex.js

/**
 * @see https://redis.io/commands/psetex
 */ class PSetEXCommand extends Command {
    constructor(cmd, opts){
        super([
            "psetex",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/pttl.js

/**
 * @see https://redis.io/commands/pttl
 */ class PTtlCommand extends Command {
    constructor(cmd, opts){
        super([
            "pttl",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/publish.js

/**
 * @see https://redis.io/commands/publish
 */ class PublishCommand extends Command {
    constructor(cmd, opts){
        super([
            "publish",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/randomkey.js

/**
 * @see https://redis.io/commands/randomkey
 */ class RandomKeyCommand extends Command {
    constructor(opts){
        super([
            "randomkey"
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/rename.js

/**
 * @see https://redis.io/commands/rename
 */ class RenameCommand extends Command {
    constructor(cmd, opts){
        super([
            "rename",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/renamenx.js

/**
 * @see https://redis.io/commands/renamenx
 */ class RenameNXCommand extends Command {
    constructor(cmd, opts){
        super([
            "renamenx",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/rpop.js

/**
 * @see https://redis.io/commands/rpop
 */ class RPopCommand extends Command {
    constructor(cmd, opts){
        super([
            "rpop",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/rpush.js

/**
 * @see https://redis.io/commands/rpush
 */ class RPushCommand extends Command {
    constructor(cmd, opts){
        super([
            "rpush",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/rpushx.js

/**
 * @see https://redis.io/commands/rpushx
 */ class RPushXCommand extends Command {
    constructor(cmd, opts){
        super([
            "rpushx",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/sadd.js

/**
 * @see https://redis.io/commands/sadd
 */ class SAddCommand extends Command {
    constructor(cmd, opts){
        super([
            "sadd",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/scan.js

/**
 * @see https://redis.io/commands/scan
 */ class ScanCommand extends Command {
    constructor([cursor, opts], cmdOpts){
        const command = [
            "scan",
            cursor
        ];
        if (opts?.match) {
            command.push("match", opts.match);
        }
        if (typeof opts?.count === "number") {
            command.push("count", opts.count);
        }
        if (opts?.type && opts.type.length > 0) {
            command.push("type", opts.type);
        }
        super(command, cmdOpts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/scard.js

/**
 * @see https://redis.io/commands/scard
 */ class SCardCommand extends Command {
    constructor(cmd, opts){
        super([
            "scard",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/script_exists.js

/**
 * @see https://redis.io/commands/script-exists
 */ class ScriptExistsCommand extends Command {
    constructor(hashes, opts){
        super([
            "script",
            "exists",
            ...hashes
        ], {
            deserialize: (result)=>result,
            ...opts
        });
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/script_flush.js

/**
 * @see https://redis.io/commands/script-flush
 */ class ScriptFlushCommand extends Command {
    constructor([opts], cmdOpts){
        const cmd = [
            "script",
            "flush"
        ];
        if (opts?.sync) {
            cmd.push("sync");
        } else if (opts?.async) {
            cmd.push("async");
        }
        super(cmd, cmdOpts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/script_load.js

/**
 * @see https://redis.io/commands/script-load
 */ class ScriptLoadCommand extends Command {
    constructor(args, opts){
        super([
            "script",
            "load",
            ...args
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/sdiff.js

/**
 * @see https://redis.io/commands/sdiff
 */ class SDiffCommand extends Command {
    constructor(cmd, opts){
        super([
            "sdiff",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/sdiffstore.js

/**
 * @see https://redis.io/commands/sdiffstore
 */ class SDiffStoreCommand extends Command {
    constructor(cmd, opts){
        super([
            "sdiffstore",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/set.js

/**
 * @see https://redis.io/commands/set
 */ class SetCommand extends Command {
    constructor([key, value, opts], cmdOpts){
        const command = [
            "set",
            key,
            value
        ];
        if (opts) {
            if ("nx" in opts && opts.nx) {
                command.push("nx");
            } else if ("xx" in opts && opts.xx) {
                command.push("xx");
            }
            if ("get" in opts && opts.get) {
                command.push("get");
            }
            if ("ex" in opts && typeof opts.ex === "number") {
                command.push("ex", opts.ex);
            } else if ("px" in opts && typeof opts.px === "number") {
                command.push("px", opts.px);
            } else if ("exat" in opts && typeof opts.exat === "number") {
                command.push("exat", opts.exat);
            } else if ("pxat" in opts && typeof opts.pxat === "number") {
                command.push("pxat", opts.pxat);
            } else if ("keepTtl" in opts && opts.keepTtl) {
                command.push("keepTtl", opts.keepTtl);
            }
        }
        super(command, cmdOpts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/setbit.js

/**
 * @see https://redis.io/commands/setbit
 */ class SetBitCommand extends Command {
    constructor(cmd, opts){
        super([
            "setbit",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/setex.js

/**
 * @see https://redis.io/commands/setex
 */ class SetExCommand extends Command {
    constructor(cmd, opts){
        super([
            "setex",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/setnx.js

/**
 * @see https://redis.io/commands/setnx
 */ class SetNxCommand extends Command {
    constructor(cmd, opts){
        super([
            "setnx",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/setrange.js

/**
 * @see https://redis.io/commands/setrange
 */ class SetRangeCommand extends Command {
    constructor(cmd, opts){
        super([
            "setrange",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/sinter.js

/**
 * @see https://redis.io/commands/sinter
 */ class SInterCommand extends Command {
    constructor(cmd, opts){
        super([
            "sinter",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/sinterstore.js

/**
 * @see https://redis.io/commands/sinterstore
 */ class SInterStoreCommand extends Command {
    constructor(cmd, opts){
        super([
            "sinterstore",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/sismember.js

/**
 * @see https://redis.io/commands/sismember
 */ class SIsMemberCommand extends Command {
    constructor(cmd, opts){
        super([
            "sismember",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/smembers.js

/**
 * @see https://redis.io/commands/smembers
 */ class SMembersCommand extends Command {
    constructor(cmd, opts){
        super([
            "smembers",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/smismember.js

/**
 * @see https://redis.io/commands/smismember
 */ class SMIsMemberCommand extends Command {
    constructor(cmd, opts){
        super([
            "smismember",
            cmd[0],
            ...cmd[1]
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/smove.js

/**
 * @see https://redis.io/commands/smove
 */ class SMoveCommand extends Command {
    constructor(cmd, opts){
        super([
            "smove",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/spop.js

/**
 * @see https://redis.io/commands/spop
 */ class SPopCommand extends Command {
    constructor([key, count], opts){
        const command = [
            "spop",
            key
        ];
        if (typeof count === "number") {
            command.push(count);
        }
        super(command, opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/srandmember.js

/**
 * @see https://redis.io/commands/srandmember
 */ class SRandMemberCommand extends Command {
    constructor([key, count], opts){
        const command = [
            "srandmember",
            key
        ];
        if (typeof count === "number") {
            command.push(count);
        }
        super(command, opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/srem.js

/**
 * @see https://redis.io/commands/srem
 */ class SRemCommand extends Command {
    constructor(cmd, opts){
        super([
            "srem",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/sscan.js

/**
 * @see https://redis.io/commands/sscan
 */ class SScanCommand extends Command {
    constructor([key, cursor, opts], cmdOpts){
        const command = [
            "sscan",
            key,
            cursor
        ];
        if (opts?.match) {
            command.push("match", opts.match);
        }
        if (typeof opts?.count === "number") {
            command.push("count", opts.count);
        }
        super(command, cmdOpts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/strlen.js

/**
 * @see https://redis.io/commands/strlen
 */ class StrLenCommand extends Command {
    constructor(cmd, opts){
        super([
            "strlen",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/sunion.js

/**
 * @see https://redis.io/commands/sunion
 */ class SUnionCommand extends Command {
    constructor(cmd, opts){
        super([
            "sunion",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/sunionstore.js

/**
 * @see https://redis.io/commands/sunionstore
 */ class SUnionStoreCommand extends Command {
    constructor(cmd, opts){
        super([
            "sunionstore",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/time.js

/**
 * @see https://redis.io/commands/time
 */ class TimeCommand extends Command {
    constructor(opts){
        super([
            "time"
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/touch.js

/**
 * @see https://redis.io/commands/touch
 */ class TouchCommand extends Command {
    constructor(cmd, opts){
        super([
            "touch",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/ttl.js

/**
 * @see https://redis.io/commands/ttl
 */ class TtlCommand extends Command {
    constructor(cmd, opts){
        super([
            "ttl",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/type.js

/**
 * @see https://redis.io/commands/type
 */ class TypeCommand extends Command {
    constructor(cmd, opts){
        super([
            "type",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/unlink.js

/**
 * @see https://redis.io/commands/unlink
 */ class UnlinkCommand extends Command {
    constructor(cmd, opts){
        super([
            "unlink",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/zadd.js

/**
 * @see https://redis.io/commands/zadd
 */ class ZAddCommand extends Command {
    constructor([key, arg1, ...arg2], opts){
        const command = [
            "zadd",
            key
        ];
        if ("nx" in arg1 && arg1.nx) {
            command.push("nx");
        } else if ("xx" in arg1 && arg1.xx) {
            command.push("xx");
        }
        if ("ch" in arg1 && arg1.ch) {
            command.push("ch");
        }
        if ("incr" in arg1 && arg1.incr) {
            command.push("incr");
        }
        if ("score" in arg1 && "member" in arg1) {
            command.push(arg1.score, arg1.member);
        }
        command.push(...arg2.flatMap(({ score , member  })=>[
                score,
                member
            ]));
        super(command, opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/zcard.js

/**
 * @see https://redis.io/commands/zcard
 */ class ZCardCommand extends Command {
    constructor(cmd, opts){
        super([
            "zcard",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/zcount.js

/**
 * @see https://redis.io/commands/zcount
 */ class ZCountCommand extends Command {
    constructor(cmd, opts){
        super([
            "zcount",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/zincrby.js

/**
 * @see https://redis.io/commands/zincrby
 */ class ZIncrByCommand extends Command {
    constructor(cmd, opts){
        super([
            "zincrby",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/zinterstore.js

/**
 * @see https://redis.io/commands/zInterstore
 */ class ZInterStoreCommand extends Command {
    constructor([destination, numKeys, keyOrKeys, opts], cmdOpts){
        const command = [
            "zinterstore",
            destination,
            numKeys
        ];
        if (Array.isArray(keyOrKeys)) {
            command.push(...keyOrKeys);
        } else {
            command.push(keyOrKeys);
        }
        if (opts) {
            if ("weights" in opts && opts.weights) {
                command.push("weights", ...opts.weights);
            } else if ("weight" in opts && typeof opts.weight === "number") {
                command.push("weights", opts.weight);
            }
            if ("aggregate" in opts) {
                command.push("aggregate", opts.aggregate);
            }
        }
        super(command, cmdOpts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/zlexcount.js

/**
 * @see https://redis.io/commands/zlexcount
 */ class ZLexCountCommand extends Command {
    constructor(cmd, opts){
        super([
            "zlexcount",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/zpopmax.js

/**
 * @see https://redis.io/commands/zpopmax
 */ class ZPopMaxCommand extends Command {
    constructor([key, count], opts){
        const command = [
            "zpopmax",
            key
        ];
        if (typeof count === "number") {
            command.push(count);
        }
        super(command, opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/zpopmin.js

/**
 * @see https://redis.io/commands/zpopmin
 */ class ZPopMinCommand extends Command {
    constructor([key, count], opts){
        const command = [
            "zpopmin",
            key
        ];
        if (typeof count === "number") {
            command.push(count);
        }
        super(command, opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/zrange.js

/**
 * @see https://redis.io/commands/zrange
 */ class ZRangeCommand extends Command {
    constructor([key, min, max, opts], cmdOpts){
        const command = [
            "zrange",
            key,
            min,
            max
        ];
        // Either byScore or byLex is allowed
        if (opts?.byScore) {
            command.push("byscore");
        }
        if (opts?.byLex) {
            command.push("bylex");
        }
        if (opts?.rev) {
            command.push("rev");
        }
        if (typeof opts?.count !== "undefined" && typeof opts?.offset !== "undefined") {
            command.push("limit", opts.offset, opts.count);
        }
        if (opts?.withScores) {
            command.push("withscores");
        }
        super(command, cmdOpts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/zrank.js

/**
 *  @see https://redis.io/commands/zrank
 */ class ZRankCommand extends Command {
    constructor(cmd, opts){
        super([
            "zrank",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/zrem.js

/**
 * @see https://redis.io/commands/zrem
 */ class ZRemCommand extends Command {
    constructor(cmd, opts){
        super([
            "zrem",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/zremrangebylex.js

/**
 * @see https://redis.io/commands/zremrangebylex
 */ class ZRemRangeByLexCommand extends Command {
    constructor(cmd, opts){
        super([
            "zremrangebylex",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/zremrangebyrank.js

/**
 * @see https://redis.io/commands/zremrangebyrank
 */ class ZRemRangeByRankCommand extends Command {
    constructor(cmd, opts){
        super([
            "zremrangebyrank",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/zremrangebyscore.js

/**
 * @see https://redis.io/commands/zremrangebyscore
 */ class ZRemRangeByScoreCommand extends Command {
    constructor(cmd, opts){
        super([
            "zremrangebyscore",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/zrevrank.js

/**
 *  @see https://redis.io/commands/zrevrank
 */ class ZRevRankCommand extends Command {
    constructor(cmd, opts){
        super([
            "zrevrank",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/zscan.js

/**
 * @see https://redis.io/commands/zscan
 */ class ZScanCommand extends Command {
    constructor([key, cursor, opts], cmdOpts){
        const command = [
            "zscan",
            key,
            cursor
        ];
        if (opts?.match) {
            command.push("match", opts.match);
        }
        if (typeof opts?.count === "number") {
            command.push("count", opts.count);
        }
        super(command, cmdOpts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/zscore.js

/**
 * @see https://redis.io/commands/zscore
 */ class ZScoreCommand extends Command {
    constructor(cmd, opts){
        super([
            "zscore",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/zunionstore.js

/**
 * @see https://redis.io/commands/zunionstore
 */ class ZUnionStoreCommand extends Command {
    constructor([destination, numKeys, keyOrKeys, opts], cmdOpts){
        const command = [
            "zunionstore",
            destination,
            numKeys
        ];
        if (Array.isArray(keyOrKeys)) {
            command.push(...keyOrKeys);
        } else {
            command.push(keyOrKeys);
        }
        if (opts) {
            if ("weights" in opts && opts.weights) {
                command.push("weights", ...opts.weights);
            } else if ("weight" in opts && typeof opts.weight === "number") {
                command.push("weights", opts.weight);
            }
            if ("aggregate" in opts) {
                command.push("aggregate", opts.aggregate);
            }
        }
        super(command, cmdOpts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/mod.js













































































































































;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/zmscore.js

/**
 * @see https://redis.io/commands/zmscore
 */ class ZMScoreCommand extends Command {
    constructor(cmd, opts){
        const [key, members] = cmd;
        super([
            "zmscore",
            key,
            ...members
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/commands/zdiffstore.js

/**
 * @see https://redis.io/commands/zdiffstore
 */ class ZDiffStoreCommand extends Command {
    constructor(cmd, opts){
        super([
            "zdiffstore",
            ...cmd
        ], opts);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/pipeline.js





/**
 * Upstash REST API supports command pipelining to send multiple commands in
 * batch, instead of sending each command one by one and waiting for a response.
 * When using pipelines, several commands are sent using a single HTTP request,
 * and a single JSON array response is returned. Each item in the response array
 * corresponds to the command in the same order within the pipeline.
 *
 * **NOTE:**
 *
 * Execution of the pipeline is not atomic. Even though each command in
 * the pipeline will be executed in order, commands sent by other clients can
 * interleave with the pipeline.
 *
 * **Examples:**
 *
 * ```ts
 *  const p = redis.pipeline() // or redis.multi()
 * p.set("key","value")
 * p.get("key")
 * const res = await p.exec()
 * ```
 *
 * You can also chain commands together
 * ```ts
 * const p = redis.pipeline()
 * const res = await p.set("key","value").get("key").exec()
 * ```
 *
 * It's not possible to infer correct types with a dynamic pipeline, so you can
 * override the response type manually:
 * ```ts
 *  redis.pipeline()
 *   .set("key", { greeting: "hello"})
 *   .get("key")
 *   .exec<["OK", { greeting: string } ]>()
 *
 * ```
 */ class Pipeline {
    constructor(opts){
        Object.defineProperty(this, "client", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "commands", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "commandOptions", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "multiExec", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * Send the pipeline request to upstash.
         *
         * Returns an array with the results of all pipelined commands.
         *
         * You can define a return type manually to make working in typescript easier
         * ```ts
         * redis.pipeline().get("key").exec<[{ greeting: string }]>()
         * ```
         */ Object.defineProperty(this, "exec", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async ()=>{
                if (this.commands.length === 0) {
                    throw new Error("Pipeline is empty");
                }
                const path = this.multiExec ? [
                    "multi-exec"
                ] : [
                    "pipeline"
                ];
                const res = await this.client.request({
                    path,
                    body: Object.values(this.commands).map((c)=>c.command)
                });
                return res.map(({ error , result  }, i)=>{
                    if (error) {
                        throw new UpstashError(`Command ${i + 1} [ ${this.commands[i].command[0]} ] failed: ${error}`);
                    }
                    return this.commands[i].deserialize(result);
                });
            }
        });
        /**
         * @see https://redis.io/commands/append
         */ Object.defineProperty(this, "append", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>this.chain(new AppendCommand(args, this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/bitcount
         */ Object.defineProperty(this, "bitcount", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>this.chain(new BitCountCommand(args, this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/bitop
         */ Object.defineProperty(this, "bitop", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (op, destinationKey, sourceKey, ...sourceKeys)=>this.chain(new BitOpCommand([
                    op,
                    destinationKey,
                    sourceKey,
                    ...sourceKeys
                ], this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/bitpos
         */ Object.defineProperty(this, "bitpos", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>this.chain(new BitPosCommand(args, this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/zdiffstore
         */ Object.defineProperty(this, "zdiffstore", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>this.chain(new ZDiffStoreCommand(args, this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/dbsize
         */ Object.defineProperty(this, "dbsize", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ()=>this.chain(new DBSizeCommand(this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/decr
         */ Object.defineProperty(this, "decr", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>this.chain(new DecrCommand(args, this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/decrby
         */ Object.defineProperty(this, "decrby", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>this.chain(new DecrByCommand(args, this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/del
         */ Object.defineProperty(this, "del", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>this.chain(new DelCommand(args, this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/echo
         */ Object.defineProperty(this, "echo", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>this.chain(new EchoCommand(args, this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/eval
         */ Object.defineProperty(this, "eval", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>this.chain(new EvalCommand(args, this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/evalsha
         */ Object.defineProperty(this, "evalsha", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>this.chain(new EvalshaCommand(args, this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/exists
         */ Object.defineProperty(this, "exists", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>this.chain(new ExistsCommand(args, this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/expire
         */ Object.defineProperty(this, "expire", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>this.chain(new ExpireCommand(args, this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/expireat
         */ Object.defineProperty(this, "expireat", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>this.chain(new ExpireAtCommand(args, this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/flushall
         */ Object.defineProperty(this, "flushall", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (args)=>this.chain(new FlushAllCommand(args, this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/flushdb
         */ Object.defineProperty(this, "flushdb", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>this.chain(new FlushDBCommand(args, this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/get
         */ Object.defineProperty(this, "get", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>this.chain(new GetCommand(args, this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/getbit
         */ Object.defineProperty(this, "getbit", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>this.chain(new GetBitCommand(args, this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/getdel
         */ Object.defineProperty(this, "getdel", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>this.chain(new GetDelCommand(args, this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/getrange
         */ Object.defineProperty(this, "getrange", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>this.chain(new GetRangeCommand(args, this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/getset
         */ Object.defineProperty(this, "getset", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (key, value)=>this.chain(new GetSetCommand([
                    key,
                    value
                ], this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/hdel
         */ Object.defineProperty(this, "hdel", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>this.chain(new HDelCommand(args, this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/hexists
         */ Object.defineProperty(this, "hexists", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>this.chain(new HExistsCommand(args, this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/hget
         */ Object.defineProperty(this, "hget", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>this.chain(new HGetCommand(args, this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/hgetall
         */ Object.defineProperty(this, "hgetall", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>this.chain(new HGetAllCommand(args, this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/hincrby
         */ Object.defineProperty(this, "hincrby", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>this.chain(new HIncrByCommand(args, this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/hincrbyfloat
         */ Object.defineProperty(this, "hincrbyfloat", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>this.chain(new HIncrByFloatCommand(args, this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/hkeys
         */ Object.defineProperty(this, "hkeys", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>this.chain(new HKeysCommand(args, this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/hlen
         */ Object.defineProperty(this, "hlen", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>this.chain(new HLenCommand(args, this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/hmget
         */ Object.defineProperty(this, "hmget", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>this.chain(new HMGetCommand(args, this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/hmset
         */ Object.defineProperty(this, "hmset", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (key, kv)=>this.chain(new HMSetCommand([
                    key,
                    kv
                ], this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/hrandfield
         */ Object.defineProperty(this, "hrandfield", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (key, count, withValues)=>this.chain(new HRandFieldCommand([
                    key,
                    count,
                    withValues
                ], this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/hscan
         */ Object.defineProperty(this, "hscan", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>this.chain(new HScanCommand(args, this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/hset
         */ Object.defineProperty(this, "hset", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (key, kv)=>this.chain(new HSetCommand([
                    key,
                    kv
                ], this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/hsetnx
         */ Object.defineProperty(this, "hsetnx", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (key, field, value)=>this.chain(new HSetNXCommand([
                    key,
                    field,
                    value
                ], this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/hstrlen
         */ Object.defineProperty(this, "hstrlen", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>this.chain(new HStrLenCommand(args, this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/hvals
         */ Object.defineProperty(this, "hvals", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>this.chain(new HValsCommand(args, this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/incr
         */ Object.defineProperty(this, "incr", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>this.chain(new IncrCommand(args, this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/incrby
         */ Object.defineProperty(this, "incrby", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>this.chain(new IncrByCommand(args, this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/incrbyfloat
         */ Object.defineProperty(this, "incrbyfloat", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>this.chain(new IncrByFloatCommand(args, this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/keys
         */ Object.defineProperty(this, "keys", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>this.chain(new KeysCommand(args, this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/lindex
         */ Object.defineProperty(this, "lindex", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>this.chain(new LIndexCommand(args, this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/linsert
         */ Object.defineProperty(this, "linsert", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (key, direction, pivot, value)=>this.chain(new LInsertCommand([
                    key,
                    direction,
                    pivot,
                    value
                ], this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/llen
         */ Object.defineProperty(this, "llen", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>this.chain(new LLenCommand(args, this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/lmove
         */ Object.defineProperty(this, "lmove", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>this.chain(new LMoveCommand(args, this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/lpop
         */ Object.defineProperty(this, "lpop", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>this.chain(new LPopCommand(args, this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/lpos
         */ Object.defineProperty(this, "lpos", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>this.chain(new LPosCommand(args, this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/lpush
         */ Object.defineProperty(this, "lpush", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (key, ...elements)=>this.chain(new LPushCommand([
                    key,
                    ...elements
                ], this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/lpushx
         */ Object.defineProperty(this, "lpushx", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (key, ...elements)=>this.chain(new LPushXCommand([
                    key,
                    ...elements
                ], this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/lrange
         */ Object.defineProperty(this, "lrange", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>this.chain(new LRangeCommand(args, this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/lrem
         */ Object.defineProperty(this, "lrem", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (key, count, value)=>this.chain(new LRemCommand([
                    key,
                    count,
                    value
                ], this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/lset
         */ Object.defineProperty(this, "lset", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (key, index, value)=>this.chain(new LSetCommand([
                    key,
                    index,
                    value
                ], this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/ltrim
         */ Object.defineProperty(this, "ltrim", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>this.chain(new LTrimCommand(args, this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/mget
         */ Object.defineProperty(this, "mget", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>this.chain(new MGetCommand(args, this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/mset
         */ Object.defineProperty(this, "mset", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (kv)=>this.chain(new MSetCommand([
                    kv
                ], this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/msetnx
         */ Object.defineProperty(this, "msetnx", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (kv)=>this.chain(new MSetNXCommand([
                    kv
                ], this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/persist
         */ Object.defineProperty(this, "persist", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>this.chain(new PersistCommand(args, this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/pexpire
         */ Object.defineProperty(this, "pexpire", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>this.chain(new PExpireCommand(args, this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/pexpireat
         */ Object.defineProperty(this, "pexpireat", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>this.chain(new PExpireAtCommand(args, this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/ping
         */ Object.defineProperty(this, "ping", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (args)=>this.chain(new PingCommand(args, this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/psetex
         */ Object.defineProperty(this, "psetex", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (key, ttl, value)=>this.chain(new PSetEXCommand([
                    key,
                    ttl,
                    value
                ], this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/pttl
         */ Object.defineProperty(this, "pttl", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>this.chain(new PTtlCommand(args, this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/publish
         */ Object.defineProperty(this, "publish", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>this.chain(new PublishCommand(args, this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/randomkey
         */ Object.defineProperty(this, "randomkey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ()=>this.chain(new RandomKeyCommand(this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/rename
         */ Object.defineProperty(this, "rename", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>this.chain(new RenameCommand(args, this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/renamenx
         */ Object.defineProperty(this, "renamenx", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>this.chain(new RenameNXCommand(args, this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/rpop
         */ Object.defineProperty(this, "rpop", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>this.chain(new RPopCommand(args, this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/rpush
         */ Object.defineProperty(this, "rpush", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (key, ...elements)=>this.chain(new RPushCommand([
                    key,
                    ...elements
                ], this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/rpushx
         */ Object.defineProperty(this, "rpushx", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (key, ...elements)=>this.chain(new RPushXCommand([
                    key,
                    ...elements
                ], this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/sadd
         */ Object.defineProperty(this, "sadd", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (key, ...members)=>this.chain(new SAddCommand([
                    key,
                    ...members
                ], this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/scan
         */ Object.defineProperty(this, "scan", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>this.chain(new ScanCommand(args, this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/scard
         */ Object.defineProperty(this, "scard", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>this.chain(new SCardCommand(args, this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/script-exists
         */ Object.defineProperty(this, "scriptExists", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>this.chain(new ScriptExistsCommand(args, this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/script-flush
         */ Object.defineProperty(this, "scriptFlush", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>this.chain(new ScriptFlushCommand(args, this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/script-load
         */ Object.defineProperty(this, "scriptLoad", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>this.chain(new ScriptLoadCommand(args, this.commandOptions))
        });
        /*)*
         * @see https://redis.io/commands/sdiff
         */ Object.defineProperty(this, "sdiff", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>this.chain(new SDiffCommand(args, this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/sdiffstore
         */ Object.defineProperty(this, "sdiffstore", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>this.chain(new SDiffStoreCommand(args, this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/set
         */ Object.defineProperty(this, "set", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (key, value, opts)=>this.chain(new SetCommand([
                    key,
                    value,
                    opts
                ], this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/setbit
         */ Object.defineProperty(this, "setbit", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>this.chain(new SetBitCommand(args, this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/setex
         */ Object.defineProperty(this, "setex", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (key, ttl, value)=>this.chain(new SetExCommand([
                    key,
                    ttl,
                    value
                ], this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/setnx
         */ Object.defineProperty(this, "setnx", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (key, value)=>this.chain(new SetNxCommand([
                    key,
                    value
                ], this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/setrange
         */ Object.defineProperty(this, "setrange", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>this.chain(new SetRangeCommand(args, this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/sinter
         */ Object.defineProperty(this, "sinter", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>this.chain(new SInterCommand(args, this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/sinterstore
         */ Object.defineProperty(this, "sinterstore", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>this.chain(new SInterStoreCommand(args, this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/sismember
         */ Object.defineProperty(this, "sismember", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (key, member)=>this.chain(new SIsMemberCommand([
                    key,
                    member
                ], this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/smembers
         */ Object.defineProperty(this, "smembers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>this.chain(new SMembersCommand(args, this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/smismember
         */ Object.defineProperty(this, "smismember", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (key, members)=>this.chain(new SMIsMemberCommand([
                    key,
                    members
                ], this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/smove
         */ Object.defineProperty(this, "smove", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (source, destination, member)=>this.chain(new SMoveCommand([
                    source,
                    destination,
                    member
                ], this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/spop
         */ Object.defineProperty(this, "spop", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>this.chain(new SPopCommand(args, this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/srandmember
         */ Object.defineProperty(this, "srandmember", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>this.chain(new SRandMemberCommand(args, this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/srem
         */ Object.defineProperty(this, "srem", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (key, ...members)=>this.chain(new SRemCommand([
                    key,
                    ...members
                ], this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/sscan
         */ Object.defineProperty(this, "sscan", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>this.chain(new SScanCommand(args, this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/strlen
         */ Object.defineProperty(this, "strlen", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>this.chain(new StrLenCommand(args, this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/sunion
         */ Object.defineProperty(this, "sunion", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>this.chain(new SUnionCommand(args, this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/sunionstore
         */ Object.defineProperty(this, "sunionstore", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>this.chain(new SUnionStoreCommand(args, this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/time
         */ Object.defineProperty(this, "time", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ()=>this.chain(new TimeCommand(this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/touch
         */ Object.defineProperty(this, "touch", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>this.chain(new TouchCommand(args, this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/ttl
         */ Object.defineProperty(this, "ttl", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>this.chain(new TtlCommand(args, this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/type
         */ Object.defineProperty(this, "type", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>this.chain(new TypeCommand(args, this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/unlink
         */ Object.defineProperty(this, "unlink", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>this.chain(new UnlinkCommand(args, this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/zadd
         */ Object.defineProperty(this, "zadd", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>{
                if ("score" in args[1]) {
                    return this.chain(new ZAddCommand([
                        args[0],
                        args[1],
                        ...args.slice(2)
                    ], this.commandOptions));
                }
                return this.chain(new ZAddCommand([
                    args[0],
                    args[1],
                    ...args.slice(2)
                ], this.commandOptions));
            }
        });
        /**
         * @see https://redis.io/commands/zcard
         */ Object.defineProperty(this, "zcard", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>this.chain(new ZCardCommand(args, this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/zcount
         */ Object.defineProperty(this, "zcount", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>this.chain(new ZCountCommand(args, this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/zincrby
         */ Object.defineProperty(this, "zincrby", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (key, increment, member)=>this.chain(new ZIncrByCommand([
                    key,
                    increment,
                    member
                ], this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/zinterstore
         */ Object.defineProperty(this, "zinterstore", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>this.chain(new ZInterStoreCommand(args, this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/zlexcount
         */ Object.defineProperty(this, "zlexcount", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>this.chain(new ZLexCountCommand(args, this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/zmscore
         */ Object.defineProperty(this, "zmscore", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>this.chain(new ZMScoreCommand(args, this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/zpopmax
         */ Object.defineProperty(this, "zpopmax", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>this.chain(new ZPopMaxCommand(args, this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/zpopmin
         */ Object.defineProperty(this, "zpopmin", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>this.chain(new ZPopMinCommand(args, this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/zrange
         */ Object.defineProperty(this, "zrange", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>this.chain(new ZRangeCommand(args, this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/zrank
         */ Object.defineProperty(this, "zrank", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (key, member)=>this.chain(new ZRankCommand([
                    key,
                    member
                ], this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/zrem
         */ Object.defineProperty(this, "zrem", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (key, ...members)=>this.chain(new ZRemCommand([
                    key,
                    ...members
                ], this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/zremrangebylex
         */ Object.defineProperty(this, "zremrangebylex", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>this.chain(new ZRemRangeByLexCommand(args, this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/zremrangebyrank
         */ Object.defineProperty(this, "zremrangebyrank", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>this.chain(new ZRemRangeByRankCommand(args, this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/zremrangebyscore
         */ Object.defineProperty(this, "zremrangebyscore", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>this.chain(new ZRemRangeByScoreCommand(args, this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/zrevrank
         */ Object.defineProperty(this, "zrevrank", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (key, member)=>this.chain(new ZRevRankCommand([
                    key,
                    member
                ], this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/zscan
         */ Object.defineProperty(this, "zscan", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>this.chain(new ZScanCommand(args, this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/zscore
         */ Object.defineProperty(this, "zscore", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (key, member)=>this.chain(new ZScoreCommand([
                    key,
                    member
                ], this.commandOptions))
        });
        /**
         * @see https://redis.io/commands/zunionstore
         */ Object.defineProperty(this, "zunionstore", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>this.chain(new ZUnionStoreCommand(args, this.commandOptions))
        });
        this.client = opts.client;
        this.commands = [];
        this.commandOptions = opts.commandOptions;
        this.multiExec = opts.multiExec ?? false;
    }
    /**
     * Pushes a command into the pipelien and returns a chainable instance of the
     * pipeline
     */ chain(command) {
        this.commands.push(command);
        return this;
    }
    /**
     * @see https://redis.io/commands/?group=json
     */ get json() {
        // For some reason we needed to define the types manually, otherwise Deno wouldn't build it
        return {
            /**
             * @see https://redis.io/commands/json.arrappend
             */ arrappend: (...args)=>this.chain(new JsonArrAppendCommand(args, this.commandOptions)),
            /**
             * @see https://redis.io/commands/json.arrindex
             */ arrindex: (...args)=>this.chain(new JsonArrIndexCommand(args, this.commandOptions)),
            /**
             * @see https://redis.io/commands/json.arrinsert
             */ arrinsert: (...args)=>this.chain(new JsonArrInsertCommand(args, this.commandOptions)),
            /**
             * @see https://redis.io/commands/json.arrlen
             */ arrlen: (...args)=>this.chain(new JsonArrLenCommand(args, this.commandOptions)),
            /**
             * @see https://redis.io/commands/json.arrpop
             */ arrpop: (...args)=>this.chain(new JsonArrPopCommand(args, this.commandOptions)),
            /**
             * @see https://redis.io/commands/json.arrtrim
             */ arrtrim: (...args)=>this.chain(new JsonArrTrimCommand(args, this.commandOptions)),
            /**
             * @see https://redis.io/commands/json.clear
             */ clear: (...args)=>this.chain(new JsonClearCommand(args, this.commandOptions)),
            /**
             * @see https://redis.io/commands/json.del
             */ del: (...args)=>this.chain(new JsonDelCommand(args, this.commandOptions)),
            /**
             * @see https://redis.io/commands/json.forget
             */ forget: (...args)=>this.chain(new JsonForgetCommand(args, this.commandOptions)),
            /**
             * @see https://redis.io/commands/json.get
             */ get: (...args)=>this.chain(new JsonGetCommand(args, this.commandOptions)),
            /**
             * @see https://redis.io/commands/json.mget
             */ mget: (...args)=>this.chain(new JsonMGetCommand(args, this.commandOptions)),
            /**
             * @see https://redis.io/commands/json.numincrby
             */ numincrby: (...args)=>this.chain(new JsonNumIncrByCommand(args, this.commandOptions)),
            /**
             * @see https://redis.io/commands/json.nummultby
             */ nummultby: (...args)=>this.chain(new JsonNumMultByCommand(args, this.commandOptions)),
            /**
             * @see https://redis.io/commands/json.objkeys
             */ objkeys: (...args)=>this.chain(new JsonObjKeysCommand(args, this.commandOptions)),
            /**
             * @see https://redis.io/commands/json.objlen
             */ objlen: (...args)=>this.chain(new JsonObjLenCommand(args, this.commandOptions)),
            /**
             * @see https://redis.io/commands/json.resp
             */ resp: (...args)=>this.chain(new JsonRespCommand(args, this.commandOptions)),
            /**
             * @see https://redis.io/commands/json.set
             */ set: (...args)=>this.chain(new JsonSetCommand(args, this.commandOptions)),
            /**
             * @see https://redis.io/commands/json.strappend
             */ strappend: (...args)=>this.chain(new JsonStrAppendCommand(args, this.commandOptions)),
            /**
             * @see https://redis.io/commands/json.strlen
             */ strlen: (...args)=>this.chain(new JsonStrLenCommand(args, this.commandOptions)),
            /**
             * @see https://redis.io/commands/json.toggle
             */ toggle: (...args)=>this.chain(new JsonToggleCommand(args, this.commandOptions)),
            /**
             * @see https://redis.io/commands/json.type
             */ type: (...args)=>this.chain(new JsonTypeCommand(args, this.commandOptions))
        };
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/deps/deno.land/x/base64@v0.2.1/base.js
function getLengths(b64) {
    const len = b64.length;
    // if (len % 4 > 0) {
    //   throw new TypeError("Invalid string. Length must be a multiple of 4");
    // }
    // Trim off extra bytes after placeholder bytes are found
    // See: https://github.com/beatgammit/base64-js/issues/42
    let validLen = b64.indexOf("=");
    if (validLen === -1) {
        validLen = len;
    }
    const placeHoldersLen = validLen === len ? 0 : 4 - validLen % 4;
    return [
        validLen,
        placeHoldersLen
    ];
}
function init(lookup, revLookup, urlsafe = false) {
    function _byteLength(validLen, placeHoldersLen) {
        return Math.floor((validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen);
    }
    function tripletToBase64(num) {
        return lookup[num >> 18 & 0x3f] + lookup[num >> 12 & 0x3f] + lookup[num >> 6 & 0x3f] + lookup[num & 0x3f];
    }
    function encodeChunk(buf, start, end) {
        const out = new Array((end - start) / 3);
        for(let i = start, curTriplet = 0; i < end; i += 3){
            out[curTriplet++] = tripletToBase64((buf[i] << 16) + (buf[i + 1] << 8) + buf[i + 2]);
        }
        return out.join("");
    }
    return {
        // base64 is 4/3 + up to two characters of the original data
        byteLength (b64) {
            return _byteLength.apply(null, getLengths(b64));
        },
        toUint8Array (b64) {
            const [validLen, placeHoldersLen] = getLengths(b64);
            const buf = new Uint8Array(_byteLength(validLen, placeHoldersLen));
            // If there are placeholders, only get up to the last complete 4 chars
            const len = placeHoldersLen ? validLen - 4 : validLen;
            let tmp;
            let curByte = 0;
            let i;
            for(i = 0; i < len; i += 4){
                tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)];
                buf[curByte++] = tmp >> 16 & 0xff;
                buf[curByte++] = tmp >> 8 & 0xff;
                buf[curByte++] = tmp & 0xff;
            }
            if (placeHoldersLen === 2) {
                tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4;
                buf[curByte++] = tmp & 0xff;
            } else if (placeHoldersLen === 1) {
                tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2;
                buf[curByte++] = tmp >> 8 & 0xff;
                buf[curByte++] = tmp & 0xff;
            }
            return buf;
        },
        fromUint8Array (buf) {
            const maxChunkLength = 16383; // Must be multiple of 3
            const len = buf.length;
            const extraBytes = len % 3; // If we have 1 byte left, pad 2 bytes
            const len2 = len - extraBytes;
            const parts = new Array(Math.ceil(len2 / maxChunkLength) + (extraBytes ? 1 : 0));
            let curChunk = 0;
            let chunkEnd;
            // Go through the array every three bytes, we'll deal with trailing stuff later
            for(let i = 0; i < len2; i += maxChunkLength){
                chunkEnd = i + maxChunkLength;
                parts[curChunk++] = encodeChunk(buf, i, chunkEnd > len2 ? len2 : chunkEnd);
            }
            let tmp;
            // Pad the end with zeros, but make sure to not forget the extra bytes
            if (extraBytes === 1) {
                tmp = buf[len2];
                parts[curChunk] = lookup[tmp >> 2] + lookup[tmp << 4 & 0x3f];
                if (!urlsafe) parts[curChunk] += "==";
            } else if (extraBytes === 2) {
                tmp = buf[len2] << 8 | buf[len2 + 1] & 0xff;
                parts[curChunk] = lookup[tmp >> 10] + lookup[tmp >> 4 & 0x3f] + lookup[tmp << 2 & 0x3f];
                if (!urlsafe) parts[curChunk] += "=";
            }
            return parts.join("");
        }
    };
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/deps/deno.land/x/base64@v0.2.1/base64url.js

const lookup = [];
const revLookup = [];
const code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
for(let i = 0, l = code.length; i < l; ++i){
    lookup[i] = code[i];
    revLookup[code.charCodeAt(i)] = i;
}
const { byteLength , toUint8Array , fromUint8Array  } = init(lookup, revLookup, true);

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/deps/denopkg.com/chiefbiiko/std-encoding@v1.0.0/mod.js

const decoder = new TextDecoder();
const encoder = new TextEncoder();
/** Serializes a Uint8Array to a hexadecimal string. */ function toHexString(buf) {
    return buf.reduce((hex, byte)=>`${hex}${byte < 16 ? "0" : ""}${byte.toString(16)}`, "");
}
/** Deserializes a Uint8Array from a hexadecimal string. */ function fromHexString(hex) {
    const len = hex.length;
    if (len % 2 || !/^[0-9a-fA-F]+$/.test(hex)) {
        throw new TypeError("Invalid hex string.");
    }
    hex = hex.toLowerCase();
    const buf = new Uint8Array(Math.floor(len / 2));
    const end = len / 2;
    for(let i = 0; i < end; ++i){
        buf[i] = parseInt(hex.substr(i * 2, 2), 16);
    }
    return buf;
}
/** Decodes a Uint8Array to utf8-, base64-, or hex-encoded string. */ function decode(buf, encoding = "utf8") {
    if (/^utf-?8$/i.test(encoding)) {
        return decoder.decode(buf);
    } else if (/^base64$/i.test(encoding)) {
        return fromUint8Array(buf);
    } else if (/^hex(?:adecimal)?$/i.test(encoding)) {
        return toHexString(buf);
    } else {
        throw new TypeError("Unsupported string encoding.");
    }
}
function encode(str, encoding = "utf8") {
    if (/^utf-?8$/i.test(encoding)) {
        return encoder.encode(str);
    } else if (/^base64$/i.test(encoding)) {
        return toUint8Array(str);
    } else if (/^hex(?:adecimal)?$/i.test(encoding)) {
        return fromHexString(str);
    } else {
        throw new TypeError("Unsupported string encoding.");
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/deps/deno.land/x/sha1@v1.0.3/deps.js


;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/deps/deno.land/x/sha1@v1.0.3/mod.js

function rotl(x, n) {
    return x << n | x >>> 32 - n;
}
/** Byte length of a SHA1 digest. */ const BYTES = 20;
/**  A class representation of the SHA1 algorithm. */ class SHA1 {
    /** Creates a SHA1 instance. */ constructor(){
        Object.defineProperty(this, "hashSize", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: BYTES
        });
        Object.defineProperty(this, "_buf", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Uint8Array(64)
        });
        Object.defineProperty(this, "_bufIdx", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_count", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_K", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Uint32Array([
                0x5a827999,
                0x6ed9eba1,
                0x8f1bbcdc,
                0xca62c1d6
            ])
        });
        Object.defineProperty(this, "_H", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_finalized", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.init();
    }
    /** Reduces the four input numbers to a single one. */ static F(t, b, c, d) {
        if (t <= 19) {
            return b & c | ~b & d;
        } else if (t <= 39) {
            return b ^ c ^ d;
        } else if (t <= 59) {
            return b & c | b & d | c & d;
        } else {
            return b ^ c ^ d;
        }
    }
    /** Initializes a hash instance. */ init() {
        // prettier-ignore
        this._H = new Uint32Array([
            0x67452301,
            0xEFCDAB89,
            0x98BADCFE,
            0x10325476,
            0xC3D2E1F0
        ]);
        this._bufIdx = 0;
        this._count = new Uint32Array(2);
        this._buf.fill(0);
        this._finalized = false;
        return this;
    }
    /** Updates a hash with additional message data. */ update(msg, inputEncoding) {
        if (msg === null) {
            throw new TypeError("msg must be a string or Uint8Array.");
        } else if (typeof msg === "string") {
            msg = encode(msg, inputEncoding);
        }
        // process the msg as many times as possible, the rest is stored in the buffer
        // message is processed in 512 bit (64 byte chunks)
        for(let i = 0; i < msg.length; i++){
            this._buf[this._bufIdx++] = msg[i];
            if (this._bufIdx === 64) {
                this.transform();
                this._bufIdx = 0;
            }
        }
        // counter update (number of message bits)
        const c = this._count;
        if ((c[0] += msg.length << 3) < msg.length << 3) {
            c[1]++;
        }
        c[1] += msg.length >>> 29;
        return this;
    }
    /** Finalizes a hash with additional message data. */ digest(outputEncoding) {
        if (this._finalized) {
            throw new Error("digest has already been called.");
        }
        this._finalized = true;
        // append '1'
        const b = this._buf;
        let idx = this._bufIdx;
        b[idx++] = 0x80;
        // zeropad up to byte pos 56
        while(idx !== 56){
            if (idx === 64) {
                this.transform();
                idx = 0;
            }
            b[idx++] = 0;
        }
        // append length in bits
        const c = this._count;
        b[56] = c[1] >>> 24 & 0xff;
        b[57] = c[1] >>> 16 & 0xff;
        b[58] = c[1] >>> 8 & 0xff;
        b[59] = c[1] >>> 0 & 0xff;
        b[60] = c[0] >>> 24 & 0xff;
        b[61] = c[0] >>> 16 & 0xff;
        b[62] = c[0] >>> 8 & 0xff;
        b[63] = c[0] >>> 0 & 0xff;
        this.transform();
        // return the hash as byte array (20 bytes)
        const hash = new Uint8Array(BYTES);
        for(let i = 0; i < 5; i++){
            hash[(i << 2) + 0] = this._H[i] >>> 24 & 0xff;
            hash[(i << 2) + 1] = this._H[i] >>> 16 & 0xff;
            hash[(i << 2) + 2] = this._H[i] >>> 8 & 0xff;
            hash[(i << 2) + 3] = this._H[i] >>> 0 & 0xff;
        }
        // clear internal states and prepare for new hash
        this.init();
        return outputEncoding ? decode(hash, outputEncoding) : hash;
    }
    /** Performs one transformation cycle. */ transform() {
        const h = this._H;
        let a = h[0];
        let b = h[1];
        let c = h[2];
        let d = h[3];
        let e = h[4];
        // convert byte buffer to words
        const w = new Uint32Array(80);
        for(let i = 0; i < 16; i++){
            w[i] = this._buf[(i << 2) + 3] | this._buf[(i << 2) + 2] << 8 | this._buf[(i << 2) + 1] << 16 | this._buf[i << 2] << 24;
        }
        for(let t = 0; t < 80; t++){
            if (t >= 16) {
                w[t] = rotl(w[t - 3] ^ w[t - 8] ^ w[t - 14] ^ w[t - 16], 1);
            }
            const tmp = rotl(a, 5) + SHA1.F(t, b, c, d) + e + w[t] + this._K[Math.floor(t / 20)] | 0;
            e = d;
            d = c;
            c = rotl(b, 30);
            b = a;
            a = tmp;
        }
        h[0] = h[0] + a | 0;
        h[1] = h[1] + b | 0;
        h[2] = h[2] + c | 0;
        h[3] = h[3] + d | 0;
        h[4] = h[4] + e | 0;
    }
}
/** Generates a SHA1 hash of the input data. */ function sha1(msg, inputEncoding, outputEncoding) {
    return new SHA1().update(msg, inputEncoding).digest(outputEncoding);
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/script.js

/**
 * Creates a new script.
 *
 * Scripts offer the ability to optimistically try to execute a script without having to send the
 * entire script to the server. If the script is loaded on the server, it tries again by sending
 * the entire script. Afterwards, the script is cached on the server.
 *
 * @example
 * ```ts
 * const redis = new Redis({...})
 *
 * const script = redis.createScript<string>("return ARGV[1];")
 * const arg1 = await script.eval([], ["Hello World"])
 * assertEquals(arg1, "Hello World")
 * ```
 */ class Script {
    constructor(redis, script){
        Object.defineProperty(this, "script", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "sha1", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "redis", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.redis = redis;
        this.sha1 = this.digest(script);
        this.script = script;
    }
    /**
     * Send an `EVAL` command to redis.
     */ async eval(keys, args) {
        return await this.redis.eval(this.script, keys, args);
    }
    /**
     * Calculates the sha1 hash of the script and then calls `EVALSHA`.
     */ async evalsha(keys, args) {
        return await this.redis.evalsha(this.sha1, keys, args);
    }
    /**
     * Optimistically try to run `EVALSHA` first.
     * If the script is not loaded in redis, it will fall back and try again with `EVAL`.
     *
     * Following calls will be able to use the cached script
     */ async exec(keys, args) {
        const res = await this.redis.evalsha(this.sha1, keys, args).catch(async (err)=>{
            if (err instanceof Error && err.message.toLowerCase().includes("noscript")) {
                return await this.redis.eval(this.script, keys, args);
            }
            throw err;
        });
        return res;
    }
    /**
     * Compute the sha1 hash of the script and return its hex representation.
     */ digest(s) {
        const hash = sha1(s, "utf8", "hex");
        return typeof hash === "string" ? hash : new TextDecoder().decode(hash);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/redis.js





/**
 * Serverless redis client for upstash.
 */ class redis_Redis {
    /**
     * Create a new redis client
     *
     * @example
     * ```typescript
     * const redis = new Redis({
     *  url: "<UPSTASH_REDIS_REST_URL>",
     *  token: "<UPSTASH_REDIS_REST_TOKEN>",
     * });
     * ```
     */ constructor(client, opts){
        Object.defineProperty(this, "client", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "opts", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "enableTelemetry", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * Wrap a new middleware around the HTTP client.
         */ Object.defineProperty(this, "use", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (middleware)=>{
                const makeRequest = this.client.request.bind(this.client);
                this.client.request = (req)=>middleware(req, makeRequest);
            }
        });
        /**
         * Technically this is not private, we can hide it from intellisense by doing this
         */ Object.defineProperty(this, "addTelemetry", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (telemetry)=>{
                if (!this.enableTelemetry) {
                    return;
                }
                try {
                    // @ts-ignore - The `Requester` interface does not know about this method but it will be there
                    // as long as the user uses the standard HttpClient
                    this.client.mergeTelemetry(telemetry);
                } catch  {
                // ignore
                }
            }
        });
        /**
         * Create a new pipeline that allows you to send requests in bulk.
         *
         * @see {@link Pipeline}
         */ Object.defineProperty(this, "pipeline", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ()=>new Pipeline({
                    client: this.client,
                    commandOptions: this.opts,
                    multiExec: false
                })
        });
        /**
         * Create a new transaction to allow executing multiple steps atomically.
         *
         * All the commands in a transaction are serialized and executed sequentially. A request sent by
         * another client will never be served in the middle of the execution of a Redis Transaction. This
         * guarantees that the commands are executed as a single isolated operation.
         *
         * @see {@link Pipeline}
         */ Object.defineProperty(this, "multi", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ()=>new Pipeline({
                    client: this.client,
                    commandOptions: this.opts,
                    multiExec: true
                })
        });
        /**
         * @see https://redis.io/commands/append
         */ Object.defineProperty(this, "append", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>new AppendCommand(args, this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/bitcount
         */ Object.defineProperty(this, "bitcount", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>new BitCountCommand(args, this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/bitop
         */ Object.defineProperty(this, "bitop", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (op, destinationKey, sourceKey, ...sourceKeys)=>new BitOpCommand([
                    op,
                    destinationKey,
                    sourceKey,
                    ...sourceKeys
                ], this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/bitpos
         */ Object.defineProperty(this, "bitpos", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>new BitPosCommand(args, this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/dbsize
         */ Object.defineProperty(this, "dbsize", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ()=>new DBSizeCommand(this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/decr
         */ Object.defineProperty(this, "decr", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>new DecrCommand(args, this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/decrby
         */ Object.defineProperty(this, "decrby", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>new DecrByCommand(args, this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/del
         */ Object.defineProperty(this, "del", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>new DelCommand(args, this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/echo
         */ Object.defineProperty(this, "echo", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>new EchoCommand(args, this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/eval
         */ Object.defineProperty(this, "eval", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>new EvalCommand(args, this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/evalsha
         */ Object.defineProperty(this, "evalsha", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>new EvalshaCommand(args, this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/exists
         */ Object.defineProperty(this, "exists", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>new ExistsCommand(args, this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/expire
         */ Object.defineProperty(this, "expire", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>new ExpireCommand(args, this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/expireat
         */ Object.defineProperty(this, "expireat", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>new ExpireAtCommand(args, this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/flushall
         */ Object.defineProperty(this, "flushall", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (args)=>new FlushAllCommand(args, this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/flushdb
         */ Object.defineProperty(this, "flushdb", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>new FlushDBCommand(args, this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/get
         */ Object.defineProperty(this, "get", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>new GetCommand(args, this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/getbit
         */ Object.defineProperty(this, "getbit", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>new GetBitCommand(args, this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/getdel
         */ Object.defineProperty(this, "getdel", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>new GetDelCommand(args, this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/getrange
         */ Object.defineProperty(this, "getrange", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>new GetRangeCommand(args, this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/getset
         */ Object.defineProperty(this, "getset", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (key, value)=>new GetSetCommand([
                    key,
                    value
                ], this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/hdel
         */ Object.defineProperty(this, "hdel", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>new HDelCommand(args, this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/hexists
         */ Object.defineProperty(this, "hexists", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>new HExistsCommand(args, this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/hget
         */ Object.defineProperty(this, "hget", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>new HGetCommand(args, this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/hgetall
         */ Object.defineProperty(this, "hgetall", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>new HGetAllCommand(args, this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/hincrby
         */ Object.defineProperty(this, "hincrby", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>new HIncrByCommand(args, this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/hincrbyfloat
         */ Object.defineProperty(this, "hincrbyfloat", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>new HIncrByFloatCommand(args, this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/hkeys
         */ Object.defineProperty(this, "hkeys", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>new HKeysCommand(args, this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/hlen
         */ Object.defineProperty(this, "hlen", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>new HLenCommand(args, this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/hmget
         */ Object.defineProperty(this, "hmget", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>new HMGetCommand(args, this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/hmset
         */ Object.defineProperty(this, "hmset", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (key, kv)=>new HMSetCommand([
                    key,
                    kv
                ], this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/hrandfield
         */ Object.defineProperty(this, "hrandfield", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (key, count, withValues)=>new HRandFieldCommand([
                    key,
                    count,
                    withValues
                ], this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/hscan
         */ Object.defineProperty(this, "hscan", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>new HScanCommand(args, this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/hset
         */ Object.defineProperty(this, "hset", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (key, kv)=>new HSetCommand([
                    key,
                    kv
                ], this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/hsetnx
         */ Object.defineProperty(this, "hsetnx", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (key, field, value)=>new HSetNXCommand([
                    key,
                    field,
                    value
                ], this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/hstrlen
         */ Object.defineProperty(this, "hstrlen", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>new HStrLenCommand(args, this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/hvals
         */ Object.defineProperty(this, "hvals", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>new HValsCommand(args, this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/incr
         */ Object.defineProperty(this, "incr", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>new IncrCommand(args, this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/incrby
         */ Object.defineProperty(this, "incrby", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>new IncrByCommand(args, this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/incrbyfloat
         */ Object.defineProperty(this, "incrbyfloat", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>new IncrByFloatCommand(args, this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/keys
         */ Object.defineProperty(this, "keys", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>new KeysCommand(args, this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/lindex
         */ Object.defineProperty(this, "lindex", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>new LIndexCommand(args, this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/linsert
         */ Object.defineProperty(this, "linsert", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (key, direction, pivot, value)=>new LInsertCommand([
                    key,
                    direction,
                    pivot,
                    value
                ], this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/llen
         */ Object.defineProperty(this, "llen", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>new LLenCommand(args, this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/lmove
         */ Object.defineProperty(this, "lmove", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>new LMoveCommand(args, this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/lpop
         */ Object.defineProperty(this, "lpop", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>new LPopCommand(args, this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/lpos
         */ Object.defineProperty(this, "lpos", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>new LPosCommand(args, this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/lpush
         */ Object.defineProperty(this, "lpush", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (key, ...elements)=>new LPushCommand([
                    key,
                    ...elements
                ], this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/lpushx
         */ Object.defineProperty(this, "lpushx", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (key, ...elements)=>new LPushXCommand([
                    key,
                    ...elements
                ], this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/lrange
         */ Object.defineProperty(this, "lrange", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>new LRangeCommand(args, this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/lrem
         */ Object.defineProperty(this, "lrem", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (key, count, value)=>new LRemCommand([
                    key,
                    count,
                    value
                ], this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/lset
         */ Object.defineProperty(this, "lset", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (key, index, value)=>new LSetCommand([
                    key,
                    index,
                    value
                ], this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/ltrim
         */ Object.defineProperty(this, "ltrim", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>new LTrimCommand(args, this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/mget
         */ Object.defineProperty(this, "mget", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>new MGetCommand(args, this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/mset
         */ Object.defineProperty(this, "mset", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (kv)=>new MSetCommand([
                    kv
                ], this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/msetnx
         */ Object.defineProperty(this, "msetnx", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (kv)=>new MSetNXCommand([
                    kv
                ], this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/persist
         */ Object.defineProperty(this, "persist", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>new PersistCommand(args, this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/pexpire
         */ Object.defineProperty(this, "pexpire", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>new PExpireCommand(args, this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/pexpireat
         */ Object.defineProperty(this, "pexpireat", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>new PExpireAtCommand(args, this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/ping
         */ Object.defineProperty(this, "ping", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (args)=>new PingCommand(args, this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/psetex
         */ Object.defineProperty(this, "psetex", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (key, ttl, value)=>new PSetEXCommand([
                    key,
                    ttl,
                    value
                ], this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/pttl
         */ Object.defineProperty(this, "pttl", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>new PTtlCommand(args, this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/publish
         */ Object.defineProperty(this, "publish", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>new PublishCommand(args, this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/randomkey
         */ Object.defineProperty(this, "randomkey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ()=>new RandomKeyCommand().exec(this.client)
        });
        /**
         * @see https://redis.io/commands/rename
         */ Object.defineProperty(this, "rename", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>new RenameCommand(args, this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/renamenx
         */ Object.defineProperty(this, "renamenx", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>new RenameNXCommand(args, this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/rpop
         */ Object.defineProperty(this, "rpop", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>new RPopCommand(args, this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/rpush
         */ Object.defineProperty(this, "rpush", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (key, ...elements)=>new RPushCommand([
                    key,
                    ...elements
                ], this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/rpushx
         */ Object.defineProperty(this, "rpushx", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (key, ...elements)=>new RPushXCommand([
                    key,
                    ...elements
                ], this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/sadd
         */ Object.defineProperty(this, "sadd", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (key, ...members)=>new SAddCommand([
                    key,
                    ...members
                ], this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/scan
         */ Object.defineProperty(this, "scan", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>new ScanCommand(args, this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/scard
         */ Object.defineProperty(this, "scard", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>new SCardCommand(args, this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/script-exists
         */ Object.defineProperty(this, "scriptExists", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>new ScriptExistsCommand(args, this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/script-flush
         */ Object.defineProperty(this, "scriptFlush", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>new ScriptFlushCommand(args, this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/script-load
         */ Object.defineProperty(this, "scriptLoad", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>new ScriptLoadCommand(args, this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/sdiff
         */ Object.defineProperty(this, "sdiff", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>new SDiffCommand(args, this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/sdiffstore
         */ Object.defineProperty(this, "sdiffstore", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>new SDiffStoreCommand(args, this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/set
         */ Object.defineProperty(this, "set", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (key, value, opts)=>new SetCommand([
                    key,
                    value,
                    opts
                ], this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/setbit
         */ Object.defineProperty(this, "setbit", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>new SetBitCommand(args, this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/setex
         */ Object.defineProperty(this, "setex", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (key, ttl, value)=>new SetExCommand([
                    key,
                    ttl,
                    value
                ], this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/setnx
         */ Object.defineProperty(this, "setnx", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (key, value)=>new SetNxCommand([
                    key,
                    value
                ], this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/setrange
         */ Object.defineProperty(this, "setrange", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>new SetRangeCommand(args, this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/sinter
         */ Object.defineProperty(this, "sinter", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>new SInterCommand(args, this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/sinterstore
         */ Object.defineProperty(this, "sinterstore", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>new SInterStoreCommand(args, this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/sismember
         */ Object.defineProperty(this, "sismember", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (key, member)=>new SIsMemberCommand([
                    key,
                    member
                ], this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/smismember
         */ Object.defineProperty(this, "smismember", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (key, members)=>new SMIsMemberCommand([
                    key,
                    members
                ], this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/smembers
         */ Object.defineProperty(this, "smembers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>new SMembersCommand(args, this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/smove
         */ Object.defineProperty(this, "smove", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (source, destination, member)=>new SMoveCommand([
                    source,
                    destination,
                    member
                ], this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/spop
         */ Object.defineProperty(this, "spop", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>new SPopCommand(args, this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/srandmember
         */ Object.defineProperty(this, "srandmember", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>new SRandMemberCommand(args, this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/srem
         */ Object.defineProperty(this, "srem", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (key, ...members)=>new SRemCommand([
                    key,
                    ...members
                ], this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/sscan
         */ Object.defineProperty(this, "sscan", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>new SScanCommand(args, this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/strlen
         */ Object.defineProperty(this, "strlen", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>new StrLenCommand(args, this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/sunion
         */ Object.defineProperty(this, "sunion", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>new SUnionCommand(args, this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/sunionstore
         */ Object.defineProperty(this, "sunionstore", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>new SUnionStoreCommand(args, this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/time
         */ Object.defineProperty(this, "time", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ()=>new TimeCommand().exec(this.client)
        });
        /**
         * @see https://redis.io/commands/touch
         */ Object.defineProperty(this, "touch", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>new TouchCommand(args, this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/ttl
         */ Object.defineProperty(this, "ttl", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>new TtlCommand(args, this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/type
         */ Object.defineProperty(this, "type", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>new TypeCommand(args, this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/unlink
         */ Object.defineProperty(this, "unlink", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>new UnlinkCommand(args, this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/zadd
         */ Object.defineProperty(this, "zadd", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>{
                if ("score" in args[1]) {
                    return new ZAddCommand([
                        args[0],
                        args[1],
                        ...args.slice(2)
                    ], this.opts).exec(this.client);
                }
                return new ZAddCommand([
                    args[0],
                    args[1],
                    ...args.slice(2)
                ], this.opts).exec(this.client);
            }
        });
        /**
         * @see https://redis.io/commands/zcard
         */ Object.defineProperty(this, "zcard", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>new ZCardCommand(args, this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/zcount
         */ Object.defineProperty(this, "zcount", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>new ZCountCommand(args, this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/zdiffstore
         */ Object.defineProperty(this, "zdiffstore", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>new ZDiffStoreCommand(args, this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/zincrby
         */ Object.defineProperty(this, "zincrby", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (key, increment, member)=>new ZIncrByCommand([
                    key,
                    increment,
                    member
                ], this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/zinterstore
         */ Object.defineProperty(this, "zinterstore", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>new ZInterStoreCommand(args, this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/zlexcount
         */ Object.defineProperty(this, "zlexcount", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>new ZLexCountCommand(args, this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/zmscore
         */ Object.defineProperty(this, "zmscore", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>new ZMScoreCommand(args, this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/zpopmax
         */ Object.defineProperty(this, "zpopmax", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>new ZPopMaxCommand(args, this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/zpopmin
         */ Object.defineProperty(this, "zpopmin", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>new ZPopMinCommand(args, this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/zrange
         */ Object.defineProperty(this, "zrange", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>new ZRangeCommand(args, this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/zrank
         */ Object.defineProperty(this, "zrank", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (key, member)=>new ZRankCommand([
                    key,
                    member
                ], this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/zrem
         */ Object.defineProperty(this, "zrem", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (key, ...members)=>new ZRemCommand([
                    key,
                    ...members
                ], this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/zremrangebylex
         */ Object.defineProperty(this, "zremrangebylex", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>new ZRemRangeByLexCommand(args, this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/zremrangebyrank
         */ Object.defineProperty(this, "zremrangebyrank", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>new ZRemRangeByRankCommand(args, this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/zremrangebyscore
         */ Object.defineProperty(this, "zremrangebyscore", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>new ZRemRangeByScoreCommand(args, this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/zrevrank
         */ Object.defineProperty(this, "zrevrank", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (key, member)=>new ZRevRankCommand([
                    key,
                    member
                ], this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/zscan
         */ Object.defineProperty(this, "zscan", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>new ZScanCommand(args, this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/zscore
         */ Object.defineProperty(this, "zscore", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (key, member)=>new ZScoreCommand([
                    key,
                    member
                ], this.opts).exec(this.client)
        });
        /**
         * @see https://redis.io/commands/zunionstore
         */ Object.defineProperty(this, "zunionstore", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (...args)=>new ZUnionStoreCommand(args, this.opts).exec(this.client)
        });
        this.client = client;
        this.opts = opts;
        this.enableTelemetry = opts?.enableTelemetry ?? true;
    }
    get json() {
        return {
            /**
             * @see https://redis.io/commands/json.arrappend
             */ arrappend: (...args)=>new JsonArrAppendCommand(args, this.opts).exec(this.client),
            /**
             * @see https://redis.io/commands/json.arrindex
             */ arrindex: (...args)=>new JsonArrIndexCommand(args, this.opts).exec(this.client),
            /**
             * @see https://redis.io/commands/json.arrinsert
             */ arrinsert: (...args)=>new JsonArrInsertCommand(args, this.opts).exec(this.client),
            /**
             * @see https://redis.io/commands/json.arrlen
             */ arrlen: (...args)=>new JsonArrLenCommand(args, this.opts).exec(this.client),
            /**
             * @see https://redis.io/commands/json.arrpop
             */ arrpop: (...args)=>new JsonArrPopCommand(args, this.opts).exec(this.client),
            /**
             * @see https://redis.io/commands/json.arrtrim
             */ arrtrim: (...args)=>new JsonArrTrimCommand(args, this.opts).exec(this.client),
            /**
             * @see https://redis.io/commands/json.clear
             */ clear: (...args)=>new JsonClearCommand(args, this.opts).exec(this.client),
            /**
             * @see https://redis.io/commands/json.del
             */ del: (...args)=>new JsonDelCommand(args, this.opts).exec(this.client),
            /**
             * @see https://redis.io/commands/json.forget
             */ forget: (...args)=>new JsonForgetCommand(args, this.opts).exec(this.client),
            /**
             * @see https://redis.io/commands/json.get
             */ get: (...args)=>new JsonGetCommand(args, this.opts).exec(this.client),
            /**
             * @see https://redis.io/commands/json.mget
             */ mget: (...args)=>new JsonMGetCommand(args, this.opts).exec(this.client),
            /**
             * @see https://redis.io/commands/json.numincrby
             */ numincrby: (...args)=>new JsonNumIncrByCommand(args, this.opts).exec(this.client),
            /**
             * @see https://redis.io/commands/json.nummultby
             */ nummultby: (...args)=>new JsonNumMultByCommand(args, this.opts).exec(this.client),
            /**
             * @see https://redis.io/commands/json.objkeys
             */ objkeys: (...args)=>new JsonObjKeysCommand(args, this.opts).exec(this.client),
            /**
             * @see https://redis.io/commands/json.objlen
             */ objlen: (...args)=>new JsonObjLenCommand(args, this.opts).exec(this.client),
            /**
             * @see https://redis.io/commands/json.resp
             */ resp: (...args)=>new JsonRespCommand(args, this.opts).exec(this.client),
            /**
             * @see https://redis.io/commands/json.set
             */ set: (...args)=>new JsonSetCommand(args, this.opts).exec(this.client),
            /**
             * @see https://redis.io/commands/json.strappend
             */ strappend: (...args)=>new JsonStrAppendCommand(args, this.opts).exec(this.client),
            /**
             * @see https://redis.io/commands/json.strlen
             */ strlen: (...args)=>new JsonStrLenCommand(args, this.opts).exec(this.client),
            /**
             * @see https://redis.io/commands/json.toggle
             */ toggle: (...args)=>new JsonToggleCommand(args, this.opts).exec(this.client),
            /**
             * @see https://redis.io/commands/json.type
             */ type: (...args)=>new JsonTypeCommand(args, this.opts).exec(this.client)
        };
    }
    createScript(script) {
        return new Script(this, script);
    }
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/pkg/http.js

class HttpClient {
    constructor(config){
        Object.defineProperty(this, "baseUrl", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "headers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "options", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "retry", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.options = {
            backend: config.options?.backend,
            agent: config.agent,
            responseEncoding: config.responseEncoding ?? "base64",
            cache: config.cache
        };
        this.baseUrl = config.baseUrl.replace(/\/$/, "");
        this.headers = {
            "Content-Type": "application/json",
            ...config.headers
        };
        if (this.options.responseEncoding === "base64") {
            this.headers["Upstash-Encoding"] = "base64";
        }
        if (typeof config?.retry === "boolean" && config?.retry === false) {
            this.retry = {
                attempts: 1,
                backoff: ()=>0
            };
        } else {
            this.retry = {
                attempts: config?.retry?.retries ?? 5,
                backoff: config?.retry?.backoff ?? ((retryCount)=>Math.exp(retryCount) * 50)
            };
        }
    }
    mergeTelemetry(telemetry) {
        function merge(obj, key, value) {
            if (!value) {
                return obj;
            }
            if (obj[key]) {
                obj[key] = [
                    obj[key],
                    value
                ].join(",");
            } else {
                obj[key] = value;
            }
            return obj;
        }
        this.headers = merge(this.headers, "Upstash-Telemetry-Runtime", telemetry.runtime);
        this.headers = merge(this.headers, "Upstash-Telemetry-Platform", telemetry.platform);
        this.headers = merge(this.headers, "Upstash-Telemetry-Sdk", telemetry.sdk);
    }
    async request(req) {
        const requestOptions = {
            cache: this.options.cache,
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(req.body),
            keepalive: true,
            agent: this.options?.agent,
            /**
             * Fastly specific
             */ backend: this.options?.backend
        };
        let res = null;
        let error = null;
        for(let i = 0; i <= this.retry.attempts; i++){
            try {
                res = await fetch([
                    this.baseUrl,
                    ...req.path ?? []
                ].join("/"), requestOptions);
                break;
            } catch (err) {
                error = err;
                await new Promise((r)=>setTimeout(r, this.retry.backoff(i)));
            }
        }
        if (!res) {
            throw error ?? new Error("Exhausted all retries");
        }
        const body = await res.json();
        if (!res.ok) {
            throw new UpstashError(body.error);
        }
        if (this.options?.responseEncoding === "base64") {
            return Array.isArray(body) ? body.map(http_decode) : http_decode(body);
        }
        return body;
    }
}
function base64decode(b64) {
    let dec = "";
    try {
        /**
         * Using only atob() is not enough because it doesn't work with unicode characters
         */ const binString = atob(b64);
        const size = binString.length;
        const bytes = new Uint8Array(size);
        for(let i = 0; i < size; i++){
            bytes[i] = binString.charCodeAt(i);
        }
        dec = new TextDecoder().decode(bytes);
    } catch  {
        dec = b64;
    }
    return dec;
// try {
//   return decodeURIComponent(dec);
// } catch {
//   return dec;
// }
}
function http_decode(raw) {
    let result = undefined;
    switch(typeof raw.result){
        case "undefined":
            return raw;
        case "number":
            {
                result = raw.result;
                break;
            }
        case "object":
            {
                if (Array.isArray(raw.result)) {
                    result = raw.result.map((v)=>typeof v === "string" ? base64decode(v) : Array.isArray(v) ? v.map(base64decode) : v);
                } else {
                    // If it's not an array it must be null
                    // Apparently null is an object in javascript
                    result = null;
                }
                break;
            }
        case "string":
            {
                result = raw.result === "OK" ? "OK" : base64decode(raw.result);
                break;
            }
        default:
            break;
    }
    return {
        result,
        error: raw.error
    };
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/version.js
const VERSION = "v1.20.4";

;// CONCATENATED MODULE: ./node_modules/.pnpm/@upstash+redis@1.20.4/node_modules/@upstash/redis/esm/platforms/nodejs.js
// deno-lint-ignore-file



/**
 * Workaround for nodejs 14, where atob is not included in the standardlib
 */ if (typeof atob === "undefined") {
    global.atob = function(b64) {
        return Buffer.from(b64, "base64").toString("utf-8");
    };
}
/**
 * Serverless redis client for upstash.
 */ class Redis extends redis_Redis {
    constructor(configOrRequester){
        if ("request" in configOrRequester) {
            super(configOrRequester);
            return;
        }
        if (configOrRequester.url.startsWith(" ") || configOrRequester.url.endsWith(" ") || /\r|\n/.test(configOrRequester.url)) {
            console.warn("The redis url contains whitespace or newline, which can cause errors!");
        }
        if (configOrRequester.token.startsWith(" ") || configOrRequester.token.endsWith(" ") || /\r|\n/.test(configOrRequester.token)) {
            console.warn("The redis token contains whitespace or newline, which can cause errors!");
        }
        const client = new HttpClient({
            baseUrl: configOrRequester.url,
            retry: configOrRequester.retry,
            headers: {
                authorization: `Bearer ${configOrRequester.token}`
            },
            agent: configOrRequester.agent,
            responseEncoding: configOrRequester.responseEncoding,
            cache: "no-store"
        });
        super(client, {
            automaticDeserialization: configOrRequester.automaticDeserialization,
            enableTelemetry: !process.env.UPSTASH_DISABLE_TELEMETRY
        });
        this.addTelemetry({
            runtime: `node@${process.version}`,
            platform: process.env.VERCEL ? "vercel" : process.env.AWS_REGION ? "aws" : "unknown",
            sdk: `@upstash/redis@${VERSION}`
        });
    }
    /**
     * Create a new Upstash Redis instance from environment variables.
     *
     * Use this to automatically load connection secrets from your environment
     * variables. For instance when using the Vercel integration.
     *
     * This tries to load `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` from
     * your environment using `process.env`.
     */ static fromEnv(config) {
        // @ts-ignore process will be defined in node
        if (typeof process?.env === "undefined") {
            throw new Error('Unable to get environment variables, `process.env` is undefined. If you are deploying to cloudflare, please import from "@upstash/redis/cloudflare" instead');
        }
        // @ts-ignore process will be defined in node
        const url = process?.env["UPSTASH_REDIS_REST_URL"];
        if (!url) {
            throw new Error("Unable to find environment variable: `UPSTASH_REDIS_REST_URL`");
        }
        // @ts-ignore process will be defined in node
        const token = process?.env["UPSTASH_REDIS_REST_TOKEN"];
        if (!token) {
            throw new Error("Unable to find environment variable: `UPSTASH_REDIS_REST_TOKEN`");
        }
        return new Redis({
            ...config,
            url,
            token
        });
    }
}


/***/ }),

/***/ 231:
/***/ (() => {


// UNUSED EXPORTS: guards, isType, pick

;// CONCATENATED MODULE: ./node_modules/.pnpm/@contentlayer+client@0.3.2_esbuild@0.17.18_markdown-wasm@1.2.0/node_modules/@contentlayer/client/dist/guards.js
function is(typeName, _) {
    if (_) {
        if (Array.isArray(typeName)) {
            // TODO make type field name dynamic (probably will require to code-gen the guard function)
            return typeName.some((typeName_)=>_?.type === typeName_);
        } else {
            return typeName === _?.type;
        }
    } else {
        return (_)=>is(typeName, _);
    }
}
const isType = (/* unused pure expression or super */ null && (is));
const guards = {
    is,
    // isType,
    // hasAllFields,
    // allFields,
    hasField
};
function hasField(_, property) {
    return _.hasOwnProperty(property);
} //# sourceMappingURL=guards.js.map

;// CONCATENATED MODULE: ./node_modules/.pnpm/@contentlayer+client@0.3.2_esbuild@0.17.18_markdown-wasm@1.2.0/node_modules/@contentlayer/client/dist/index.js

 //# sourceMappingURL=index.js.map

;// CONCATENATED MODULE: ./node_modules/.pnpm/contentlayer@0.3.2_esbuild@0.17.18_markdown-wasm@1.2.0/node_modules/contentlayer/dist/client/index.js
 //# sourceMappingURL=index.js.map


/***/ }),

/***/ 2893:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* __next_internal_client_entry_do_not_use__  */ 
const { createProxy  } = __webpack_require__(1357);
module.exports = createProxy("/Users/golee.hyper-cloud/Downloads/portfolio/node_modules/.pnpm/next@13.2.4_@opentelemetry+api@1.4.1_react-dom@18.2.0_react@18.2.0/node_modules/next/dist/client/link.js");
 //# sourceMappingURL=link.js.map


/***/ }),

/***/ 6257:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


module.exports = __webpack_require__(2893);


/***/ })

};
;