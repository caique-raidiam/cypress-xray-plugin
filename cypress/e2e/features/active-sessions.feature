Feature: Active sessions

    @TestName:RPF-1678
    Scenario: RPF-1678 Checking the existing columns in active sessions page
        When I navigate to the active sessions page
        Then The system should show me the following columns
        | ID |
        | User Email |
        | Issued At |
        | Expires At |
        | Delete |