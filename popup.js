$(function () {
  chrome.storage.sync.get(["total", "limit"], function (budget) {
    console.log(budget);
    $("#total").text(budget.total);
    $("#limit").text(budget.limit);
  });

  $("#spendAmount").click(function () {
    chrome.storage.sync.get(["total", "limit"], function (budget) {
      let newTotal = 0;
      if (budget.total) {
        newTotal += parseInt(budget.total);
      }

      let amount = $("#amount").val();

      if (amount) {
        newTotal += parseInt(amount);
      }

      chrome.storage.sync.set({ total: newTotal }, function () {
        if (amount && newTotal >= budget.limit) {
          let notificationOptions = {
            type: "basic",
            iconUrl: "icon48.png",
            title: "Limit Reached",
            message: "Uh oh! Looks like you reached your limit",
          };

          chrome.notifications.create("limitNotif", notificationOptions);
        }
      });

      $("#total").text(newTotal);
      $("#amount").val("");
    });
  });
});
