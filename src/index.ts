import * as createHmac from 'create-hmac';

import { replaceDerive, pathRegex } from './utils';

type Hex = string;
type Path = string;

type Seeds = {
    seed: Buffer;
    chainCode: Buffer;
};

const BLS12_377_CURVE = 'bls12_377 seed';
const HARDENED_OFFSET = 0x80000000;

export const getMasterSeed = (seed: Hex): Seeds => {
    const hmac = createHmac('sha512', BLS12_377_CURVE);
    const I = hmac.update(Buffer.from(seed, 'hex')).digest();
    const IL = I.slice(0, 32);
    const IR = I.slice(32);
    return {
        seed: IL,
        chainCode: IR,
    };
};

export const CKDPriv = ({ seed, chainCode }: Seeds, index: number): Seeds => {
    const indexBuffer = Buffer.allocUnsafe(4);
    indexBuffer.writeUInt32BE(index, 0);

    const data = Buffer.concat([Buffer.alloc(1, 0), seed, indexBuffer]);

    const I = createHmac('sha512', chainCode)
        .update(data)
        .digest();
    const IL = I.slice(0, 32);
    const IR = I.slice(32);
    return {
        seed: IL,
        chainCode: IR,
    };
};

export const isValidPath = (path: string): boolean => {
    if (!pathRegex.test(path)) {
        return false;
    }
    return !path
        .split('/')
        .slice(1)
        .map(replaceDerive)
        .some(isNaN as any /* ts T_T*/);
};

export const derivePath = (path: Path, rootSeed: Hex, offset = HARDENED_OFFSET): Seeds => {
    if (!isValidPath(path)) {
        throw new Error('Invalid derivation path');
    }

    const { seed, chainCode } = getMasterSeed(rootSeed);
    const segments = path
        .split('/')
        .slice(1)
        .map(replaceDerive)
        .map(el => parseInt(el, 10));

    return segments.reduce(
        (parentSeeds, segment) => CKDPriv(parentSeeds, segment + offset),
        { seed, chainCode },
    );
};
