import { derivePath, getMasterSeed } from './';


const vector_1_seed = '000102030405060708090a0b0c0d0e0f';
const vector_1 = [
    {
        path: "m/0'",
        chainCode:
            '576cc5c0d34b9373ec5e2c110063d672f2731f48810c1f74403851980c9d10a1',
        seed: '87bee46085a454e5bb888814f5a472e9d9a3bf195a5f66f8466a8a23feb8fd58'
    },
    {
        path: "m/0'/1'",
        chainCode:
            'da25e246950be3b3170e8fcf9434d0f4e778efd6a4f1788594fb9e10b01ab5ef',
        seed: 'd74a50fd4a4208f49402f2514e8799340fb44488e811c5aff85a4b42a618cd56'
    },
    {
        path: "m/0'/1'/2'",
        chainCode:
            '33d6b08b3c0df9b14dd633e81d502f997650e333cb3cbed9ee92d193b0b0db5c',
        seed: 'a55ae3d9b114bf98618f5b15d29f78c54ca0f7d9f313d666130b930b8c911be4'
    },
    {
        path: "m/0'/1'/2'/2'",
        chainCode:
            '9cd197f115863bce63494eecd472e195763fe8c6a4c6262f5b48e02591ef8038',
        seed: 'bde7a9de8856319afd00f6a478dc5811e9d632802b0309107afb41c8a434f132'
    },
    {
        path: "m/0'/1'/2'/2'/1000000000'",
        chainCode:
            '55c14519572ef506ed26161d014675f0c65431e70a62ef10e5d199be15f8d0a9',
        seed: '2e57cff44f41e4609689173519ca8038dc0872e3500b744659da94c6e8896bea'
    },
];

const vector_2_seed =
    'fffcf9f6f3f0edeae7e4e1dedbd8d5d2cfccc9c6c3c0bdbab7b4b1aeaba8a5a29f9c999693908d8a8784817e7b7875726f6c696663605d5a5754514e4b484542';
const vector_2 = [
    {
        path: "m/0'",
        chainCode:
            '082adeee9cff2bc3e7b405b2485db4e75596d8c6c59a20d9c7b0889428ac5f63',
        seed: 'b8d7666395c3108301383f45b8c678be60868ce87df06e5c4834cabf7113efe3'
    },
    {
        path: "m/0'/2147483647'",
        chainCode:
            'c0cbe8cce5b29f2a787e1f77915af2c2e71fe65d4dcb7ad797b3584fcb42bcb5',
        seed: '2e6695fe0bd1e628215e5f8c0aa6b374233c6fa06019057d6d786ae66d937ef5'
    },
    {
        path: "m/0'/2147483647'/1'",
        chainCode:
            '20b2835074febca708235d131c943e65c0b9b77686045d54a85a6dc4b1b074e9',
        seed: 'bf8d47567d7e30d16fa10c891580710f85bea35e163446af8098cc64cc7d67f2'
    },
    {
        path: "m/0'/2147483647'/1'/2147483646'",
        chainCode:
            'cc130a0893fe03aea93af5240e9f39a260fa9e7c8ddc104ae3b7a30051147220',
        seed: '7f7367a4ef0123a012c72d19f3e36086e8a0ce0a89a92206dba42c3ffe5791f9'
    },
    {
        path: "m/0'/2147483647'/1'/2147483646'/2'",
        chainCode:
            'b2971d5ec13b2086d3bcdca8e5f4028dac6a0e9c528a7389301aca745916d5de',
        seed: '95604a6a332fd8df44b8124fba28f843273af43b0800c7826bc204d4d17dcb76'
    },
];

describe('Test vectors', () => {
    describe('Vector 1', () => {
        it('should have valid keys for vector 1 seed hex', () => {
            const { seed, chainCode } = getMasterSeed(vector_1_seed);
            expect(seed.toString('hex')).toEqual(
                '96e02a1d080ef552780c5f7f5285987e20a17417a524b2890a8cc05aeffe0135',
            );
            expect(chainCode.toString('hex')).toEqual(
                '358c2333acc945c6910bf9ed3abccff940fa91ab6c25b291125280b3590f6370',
            );
        });
        vector_1.forEach(vector => {
            it(`should valid for ${vector.path}`, () => {
                const { seed, chainCode } = derivePath(
                    vector.path,
                    vector_1_seed,
                );
                expect({
                    path: vector.path,
                    seed: seed.toString('hex'),
                    chainCode: chainCode.toString('hex')
                }).toEqual(vector);
            });
        });
    });

    describe('Vector 2', () => {
        it('should have valid keys for vector 2 seed hex', () => {
            const { seed, chainCode } = getMasterSeed(vector_2_seed);
            expect(seed.toString('hex')).toEqual(
                'a10168f530c5fec25fc96643695f9d7153a8e2bf5f25ce40b70c1fa3e8529ece',
            );
            expect(chainCode.toString('hex')).toEqual(
                'e74a879b89abfbe1ca49ce27b828ade720617ce04c6297cb52d2410df705a8d6',
            );
        });
        vector_2.forEach(vector => {
            it(`should valid for ${vector.path}`, () => {
                const { seed, chainCode } = derivePath(
                    vector.path,
                    vector_2_seed,
                );
                expect({
                    path: vector.path,
                    seed: seed.toString('hex'),
                    chainCode: chainCode.toString('hex')
                }).toEqual(vector);
            });
        });
    });
});
