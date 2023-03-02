describe('Scenario 1: User tries to get a list of email addresses for practice id 2', () => {
  let token;

  before(() => {
    cy.request({
      method: 'POST',
      url: 'https://qa-challenge-api.scratchpay.com/api/auth/login',
      body: {
        email: 'gianna@hightable.test',
        password: 'thedantonio1'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('token')
        .and.not.be.null
        .and.not.be.undefined;

      // Set token for subsequent requests
      token = response.body.token;
    });
  });

  it('should prevent the user from getting the list of email addresses without authorization', () => {
    cy.request({
      method: 'GET',
      url: 'https://qa-challenge-api.scratchpay.com/api/clinics/2/emails',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body).to.have.property('message', 'Unauthorized');
    });
  });

  it('should allow the user to get the list of email addresses with authorization', () => {
    cy.request({
      method: 'GET',
      url: 'https://qa-challenge-api.scratchpay.com/api/clinics/2/emails',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('emails')
        .and.be.an('array')
        .and.not.be.empty;
    });
  });
});
