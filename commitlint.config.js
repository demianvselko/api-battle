module.exports = {
    extends: ["@commitlint/config-conventional"],
    rules: {
        "type-enum": [
            2,
            "always",
            ["feat", "fix", "chore", "docs", "test"]
        ],
        "subject-case": [2, "never", ["start-case", "pascal-case", "upper-case"]],
        "footer-leading-blank": [1, "always"],
        "header-max-length": [2, "always", 100],
        // Validar que incluya el ticket de Jira
        "references-empty": [2, "never"],
    }
};
