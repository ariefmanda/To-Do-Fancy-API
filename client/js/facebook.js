window.fbAsyncInit = function() {
  FB.init({
    appId: "1530275277041978",
    cookie: true, // enable cookies to allow the server to access
    // the session
    xfbml: true, // parse social plugins on this page
    version: "v2.8" // use graph api version 2.8
  });
  FB.getLoginStatus(function(response) {
    console.log(response);
    if (response.authResponse) {
      $("#gettingstarted").html(
        `<a style="cursor:pointer;" class="nav-link" onclick="logout()">Logout</a>`
      );
    } else {
      $("#gettingstarted")
        .html(`<a style="cursor:pointer;" class="nav-link" onclick="isLogin()"> Getting Start
    </a>`);
    }
  });
};

// Load the SDK asynchronously
(function(d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s);
  js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "facebook-jssdk");

function isLogin() {
  FB.login(
    function(response) {
      if (response.authResponse) {
        axios
          .get("http://localhost:3000/api/auth", {
            headers: {
              fbtoken: response.authResponse.accessToken
            }
          })
          .then(data => {
            $("#name").html(`${data.data.name}`);
            localStorage.setItem("token", data.data.token);
            localStorage.setItem("email", data.data.email);
            localStorage.setItem("image_url", data.data.image_url);
            $("#formadd").hide();
            axios
              .get("http://localhost:3000/api/todo", {
                headers: {
                  token: data.data.token
                }
              })
              .then(data => {
                data = data.data.data;
                data.map(e => {
                  $("#tableTask").append(`
          <tr>
          <td> ${data.created_at}</td>
          <td>
                  <input onclick="success(${data._id},${
                    data.ceklist
                  })" class="checkbox" type="checkbox">
          </td>
          <td> ${data.content}</td>
          <td>
              <span uk-icon="icon: trash" onclick="destroy(${data._id})"></span>
          </td>
      </tr>
          `);
                });
              })
              .catch(err => console.log(err));
          })
          .catch(err => console.log(err));
        // window.location = "index.html";
      }
    },
    { scope: "public_profile,email" }
  );
}
function logout() {
  FB.logout(function() {
    localStorage.clear();
    window.location = "index.html";
  });
}

function open(response) {}
// function close() {
//
//     // window.location = "index.html";
// }
function formadd() {
  $("#formadd").show();
  $("#iconadd").hide();
}

function add() {
  $("#formadd").hide();
  $("#iconadd").show();
}
