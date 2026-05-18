import theme from "./theme";

const editorConfig = {
    namespace: "ConqrEditor",
    theme,
    onError(error) {
        throw error;
    },
};

export default editorConfig;