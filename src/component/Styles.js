const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "linear-gradient(135deg,rgb(240, 208, 104),rgb(243, 205, 79))",
    },
    card: {
      background: "rgb(255 35 0 / 26%)",
      padding: "2rem",
      borderRadius: "10px",
      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
      width: "100%",
      maxWidth: "400px",
      textAlign: "center",
      animation: "fadeIn 1s ease-in-out",
    },
    title: {
      marginBottom: "1.5rem",
      fontSize: "2rem",
      color: "#333",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
      background : "rgba(0, 0, 0, 0)"
    },
    input: {
    background : "rgba(255, 255, 255, 0.27)",
      padding: "0.75rem",
      borderRadius: "5px",
      border: "1px solid #ccc",
      fontSize: "1rem",
      transition: "border-color 0.3s ease",
    },
    buttonContainer: {
      display: "flex",
      gap: "1rem", // Adds space between buttons
    },
    button: {
      flex: 1, // Makes buttons take equal width
      padding: "0.75rem",
      borderRadius: "5px",
      border: "none",
      background : "rgb(23, 75, 110)",
      color: "#fff",
      fontSize: "1rem",
      cursor: "pointer",
      transition: "background 0.3s ease, transform 0.2s ease",
    },
};

export default styles