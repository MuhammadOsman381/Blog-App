export const wrapIntoFormData = (data: Record<string, any>): FormData => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
        console.log(value)
        if (Array.isArray(value)) {
            value.map((items) => {
                formData.append(key, items);
            })
        }
        else {
            formData.append(key, value);
        }
    });
    return formData;
};
