export const formatCurrency = (amount: number): string => {
  return '₹' + Math.round(amount).toLocaleString('en-IN');
};

export const formatDate = (date: Date = new Date()): string => {
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

export const getDbColor = (index: number): string => {
  const colors = ['db-blue', 'db-purple', 'db-green', 'db-amber'];
  return colors[index % colors.length];
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '');
};

export const calculateRoomCost = (
  sharing: string,
  quantity: number,
  rate: number
): number => {
  const sharingSize = parseInt(sharing);
  return rate * sharingSize * quantity;
};
