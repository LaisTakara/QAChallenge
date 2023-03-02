describe("Clinic Search", () => {
    it("should return a list of clinics with the word 'veterinary' in their name if user is logged in", () => {
      cy.request({
        method: "GET",
        url: "https://qa-challenge-api.scratchpay.com/api/auth",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          email: "gianna@hightable.test",
          password: "thedantonio1",
        },
      }).then((response) => {
        const token = response.body.token;
        const searchTerm = "veterinary";
        cy.request({
          method: "GET",
          url: `https://qa-challenge-api.scratchpay.com/api/clinics?term=${searchTerm}`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.length).to.be.greaterThan(0);
          response.body.forEach((clinic) => {
            expect(clinic.name.toLowerCase()).to.include(searchTerm);
          });
        });
      });
    });
  
    it("should return an error if user is not logged in", () => {
      const searchTerm = "veterinary";
      cy.request({
        method: "GET",
        url: `https://qa-challenge-api.scratchpay.com/api/clinics?term=${searchTerm}`,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(401);
        expect(response.body.message).to.eq(
          "Authorization token not found or invalid."
        );
      });
    });
  });
  