import ProductModel from '../Product';

test('It accepts all params and implements all methods', () => {
    let raw = {id: '1234', name: 'foo', price: 100, images: ['img1','img2','img3']};
    const product = new ProductModel(raw);
    expect(product.getId()).toBe(raw.id);
    expect(product.getName()).toBe(raw.name);
    expect(product.getPrice()).toBe(raw.price);
    expect(product.getImages()).toBe(raw.images);
    expect(product.getData()).toEqual(raw);
})