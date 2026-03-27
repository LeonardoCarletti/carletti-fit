export const version = '0.0.1';

// Lógica de domínio complexa deve vir para cá
export const calculateBMI = (weight: number, height: number): number => {
  return weight / (height * height);
};
