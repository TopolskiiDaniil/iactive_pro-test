import apiInstance from './instance';

export const loadMessages = async () => {
  const formData = new FormData();
  formData.append('actionName', 'MessagesLoad');

  try {
    const response = await apiInstance.post('', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Ошибка при загрузке сообщений:', error);
    throw error;
  }
};
