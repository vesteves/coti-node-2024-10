import { ProductModel } from '../product.model';
import productRepository from '../product.repository'

jest.mock('../product.model');

describe('getAll', () => {
  it('should return all products with populated categories', async () => {
    const mockProducts = [
      {
        _id: '1',
        name: 'Product 1',
        price: 100,
        category: { _id: '10', name: 'Category 1' },
      },
      {
        _id: '2',
        name: 'Product 2',
        price: 200,
        category: { _id: '20', name: 'Category 2' },
      },
    ];

    // Mockando o método `find` e `populate`
    const populateMock = jest.fn().mockResolvedValue(mockProducts);
    const findMock = jest.fn().mockReturnValue({ populate: populateMock });

    // Configurando o mock no modelo
    (ProductModel.find as jest.Mock).mockImplementation(findMock);

    // Executa o método que será testado
    const result = await productRepository.getAll();

    // Verifica se os métodos foram chamados corretamente
    expect(ProductModel.find).toHaveBeenCalledTimes(1);
    expect(populateMock).toHaveBeenCalledWith('category');

    // Verifica se o resultado está correto
    expect(result).toEqual(mockProducts);
  });

  it('should handle errors and throw an exception', async () => {
    // Mocka um erro para o método `find`
    const errorMessage = 'Database error';
    const populateMock = jest.fn().mockRejectedValue(new Error(errorMessage));
    const findMock = jest.fn().mockReturnValue({ populate: populateMock });

    (ProductModel.find as jest.Mock).mockImplementation(findMock);

    // Executa o método e verifica se ele lança uma exceção
    await expect(productRepository.getAll()).rejects.toThrow(errorMessage);

    // Verifica se os métodos foram chamados corretamente
    expect(ProductModel.find).toHaveBeenCalledTimes(2);
    expect(populateMock).toHaveBeenCalledWith('category');
  });
});
