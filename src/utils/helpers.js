export const formatCurrency = (amount) => {
    return '₹' + Math.round(amount).toLocaleString('en-IN');
};
export const formatDate = (date = new Date()) => {
    return date.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
};
export const getDbColor = (index) => {
    const colors = ['db-blue', 'db-purple', 'db-green', 'db-amber'];
    return colors[index % colors.length];
};
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
export const sanitizeInput = (input) => {
    return input.trim().replace(/[<>]/g, '');
};
export const calculateRoomCost = (sharing, quantity, rate) => {
    const sharingSize = parseInt(sharing);
    return rate * sharingSize * quantity;
};
