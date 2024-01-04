class ConvertStringToInt {
    /**
     * Convert to int
     * @param  {} values
     */
    convert(value) {
        return value !== undefined ? parseInt(value, 10) : undefined;
    }
}

export const toInt = new ConvertStringToInt();
