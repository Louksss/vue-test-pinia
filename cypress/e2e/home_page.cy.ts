describe('The Home Page', () => {
    it('successfully loads home page with "Houses" tab open', () => {
      cy.visit('/')
    })

    it('successfully add a landlord to the existing list', () => {
        cy.visit('/')

        cy.get('input[name=first_name]').type("John")
        cy.get('input[name=last_name]').type("Doe")
        cy.get('#add_landlord').click()

        cy.get('#landlord_list').children().should('have.length', 4)
    })

    it('disable add button if last name is missing', () => {
        cy.visit('/')

        cy.get('input[name=first_name]').type("John")
        cy.get('#add_landlord').should('be.disabled')
    })

    it('navigate to "Tenants" tab', () => {
        cy.visit('/')

        cy.get('nav a[href=\'/tenants\']').click()
        cy.url().should('include', '/tenants')
    })

    it('navigate to "Houses" tab', () => {
        cy.visit('/tenants')

        cy.get('nav a[href=\'/\']').click()
        cy.url().should('not.include', '/tenants')
    })

    it('show a house\'s detail', () => {
        cy.visit('/')

        cy.get('.house-card .tenant-dropdown').should('not.exist')
        cy.get('.house-card').first().click()
        cy.get('.house-card .tenant-dropdown').should('exist')
    })

    it('adding a tenant to a specific landlord', () => {
        cy.visit('/tenants')

        cy.get('.tenant_form input[name=first_name]').type('John')
        cy.get('.tenant_form input[name=last_name]').type('Doe')
        cy.get('.tenant_form select[name=gender]').select('Female')
        cy.get('.tenant_form input[name=landlord_id]').type(2)
        cy.get('#add_tenant').click()

        cy.get('#tenants_of_landlord2').children().should('contain', 'John Doe') // not exact since there is no unicity on the name of a tenant
    })
  })