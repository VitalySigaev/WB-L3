export function sendEvent(type, payload) {
    const eventData = {
        type: type,
        payload: payload,
        timestamp: Date.now(),
    };

    return fetch('/api/sendEvent', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
    })
        .then((response) => {
            if (!response.ok) {
                console.error('Ошибка отправки события на сервер:', response.status);
                throw new Error(`Ошибка ${response.status}`);
            }
            console.log('Событие успешно отправлено!', eventData);
        })
        .catch((error) => {
            console.error('Ошибка при отправке события:', error);
            throw error;
        });
}

