$(function () {
  chrome.storage.sync.get("limit", function (budget) {
    console.log(budget);
    $("#limit").val(budget.limit);
  });

  $("#saveLimit").click(function () {
    let limit = $("#limit").val();

    if (limit) {
      chrome.storage.sync.set({ limit: limit }, function () {
        close();
      });
    }
  });

  $("#resetTotal").click(function () {
    chrome.storage.sync.set({ total: 0 });

    let notificationOptions = {
      type: "basic",
      iconUrl: "icon48.png",
      title: "Total Resetted",
      message: "You resetted you total",
    };

    chrome.notifications.create("limitNotif", notificationOptions);
  });
});
