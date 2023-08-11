class my_header extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `   <!-- Navbar -->
        <nav class="navbar navbar-expand-lg navbar-scroll fixed-top shadow-0 border-bottom border-dark mb-4">
          <div class="container">
            <a class="navbar-brand" href="#!"><i class="fab fa-mdb fa-4x"></i></a>
            <button class="navbar-toggler" type="button" data-mdb-toggle="collapse"
              data-mdb-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
              aria-label="Toggle navigation">
              <i class="fas fa-bars"></i>
            </button>
            <div class="navbar-collapse" id="navbarSupportedContent">
            <a href="/"><img src="../../icon/Logo.jpg" alt="gamesapp" id="logo"></a>
              <ul class="navbar-nav ms-auto">
              <div class="dropdown">
              <button class="dropbtn" id="common-services">Common Services</button>
              <div class="dropdown-content">
                <a id="hrefForPushNotification">SendPushNotification</a>
              </div>
            </div>
            <div class="dropdown">
                <button class="dropbtn" id="master-detail"> Master </button>
                <div class="dropdown-content">
                  <a id="hrefForUserIdDetails">userIdDetails</a>
                  <a id="hrefForTopActivity">TopActivity</a>
                </div>
              </div>
                <div class="dropdown">
                <button class="dropbtn" id="otp-detail"> OTP </button>
                <div class="dropdown-content">
                  <a id="hrefForOtpDetails">otpDetails</a>
                </div>
              </div>
                <div class="dropdown">
                <button class="dropbtn" id="user-detail"> User </button>
                <div class="dropdown-content">
                  <a id="hrefForUserDetails">user details</a>
                </div>
              </div>
                <div class="dropdown">
                <button class="dropbtn" id="error-detail"> Error </button>
                <div class="dropdown-content">
                  <a id="hrefForErrorDetails">Error Details</a>
                </div>
              </div>
                <div class="dropdown">
                <button class="dropbtn" id="bank-detail"> Bank Account </button>
                <div class="dropdown-content">
                  <a id="hrefForBankDetails">Bank Details</a>
                </div>
              </div>
              <div class="dropdown">
                <button class="dropbtn" id="creator"> Creator </button>
                <div class="dropdown-content">
                  <a id="hrefForCreatorDetails">Creator Details</a>
                </div>
              </div>
                <div class="dropdown">
                <button class="dropbtn" style="background:#a7a0a0" id="payment-services">Payment Services</button>
                <div class="dropdown-content">
                  <a id="hrefForWithdrawTxn">withdrawTransactionList</a>
                  <a id="hrefForDeposit">depositTransactionList</a>
                  <a id="hrefForPending">pendingPaymentApproval List </a>
                  <a id="hrefForExternal">externalApiLogWithdrawList</a>
                  <a id="hrefForTransactionHistory">transactionHistoryList</a>
                </div>
              </div>
              </ul>
            </div>
          </div>
        </nav>
        <!-- Navbar -->`
  }
}
customElements.define('my-header', my_header)