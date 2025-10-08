import apiInstance from './instance';

/**
 * Загружает сообщения
 * @param {number} lastMessageId — ID последнего известного сообщения
 * @returns {Promise<Array>} — массив новых сообщений (может быть пустым)
 */
export const loadMessages = async (lastMessageId = 0) => {
  const formData = new FormData();
  formData.append('actionName', 'MessagesLoad');
  formData.append('messageId', String(lastMessageId));

  try {
    const response = await apiInstance.post('', formData);
		if(response.data === 'no message'){
			return [];
		}
    return response.data || [];
  } catch (error) {
    console.error('Ошибка загрузки сообщений:', error);
    throw error;
  }
};
