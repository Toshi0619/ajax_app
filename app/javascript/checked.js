function check() {
  const posts = document.querySelectorAll(".post");
  posts.forEach(function (post) { 
                          //  #戻り値を設定
    if (post.getAttribute("data-load") != null) {
      return null
    }
    post.setAttribute("data-load", "true");
    // メモをクリックした場合に実行する処理を定義している
    post.addEventListener("click", () => {
      // どのメモをクリックしたのか、カスタムデータを利用して取得している
      const postId = post.getAttribute("data-id");
      // Ajaxに必要なオブジェクトを生成している
      const XHR = new XMLHttpRequest();
      // openでリクエストを初期化する
      XHR.open("GET", `/posts/${postId}`, true);
                    // #テンプレートリテラル
                    // レスポンスのタイプを指定する
      
      XHR.responseType = "json";
      // sendでリクエストを送信する
      XHR.send();
      // レスポンスを受け取った時の処理を記述する
      XHR.onload = () => {
        if (XHR.status != 200) {
          // レスポンスの HTTP ステータスを解析し、該当するエラーメッセージをアラートで表示するようにしている
          alert(`Error ${XHR.status}: ${XHR.statusText}`);
          // 処理を終了している          
          return null
          // return nullでJavaScriptの処理から抜け出ることができる
        }
        // responseのステータスが200（正常）以外の時は全てエラーを返す
        // レスポンスされたデータを変数itemに代入している

        const item = XHR.response.post;
        // XHR.responseでレスポンスされてきたJSONにアクセスする

        if (item.checked === true) {
          // 既読状態であれば、灰色に変わるcssを適用するためのカスタムデータを追加している
          post.setAttribute("data-check", "true");
        } else if (item.checked === false) {
          // 未読状態であれば、カスタムデータを削除している
          post.removeAttribute("data-check");
        }
      };
    });
  });
}
setInterval(check, 1000);
