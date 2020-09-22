function memo() {
  const submit = document.getElementById("submit")
  submit.addEventListener("click", (e) => {
    const formData = new FormData(document.getElementById("form"));
    const XHR = new XMLHttpRequest();
    XHR.open("POST", "/posts", true);
    XHR.responseType = "json"
    XHR.send(formData);
    XHR.onload = () => {
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      }
      const item = XHR.response.post;
      const list = document.getElementById("list");
      const formtext = document.getElementById("content");
      // メモの入力フォームをリセットするため。この処理が終了した時に、入力フォームの文字は入力されたままになってしまうため、リセットする必要がある。
      // ここではリセット対象の要素であるcontentという要素を取得
      const HTML = `
      <div class="post" data-id=${item.id}>
        <div class="post-date">
          投稿日時：${item.created_at}
        </div>
        <div class="post-content">
        ${item.content}
        </div>
      </div>`;
      list.insertAdjacentHTML("afterend", HTML);
      formtext.value = "";
    };
    e.preventDefault();
  });
}
window.addEventListener("load", memo)