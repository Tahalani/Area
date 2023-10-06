import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';

class WebViewPage extends StatefulWidget {
  const WebViewPage({
    super.key,
  });

  @override
  State<StatefulWidget> createState() => _WebViewPageState();
}

class _WebViewPageState extends State<WebViewPage> {
  late WebViewController _controller;
  late double _progress;
  bool _isLoadingPage = false;

  @override
  void initState() {
    _progress = 0;
    _controller = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..setBackgroundColor(Colors.white)
      ..setUserAgent('Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N)')
      ..setNavigationDelegate(
        NavigationDelegate(
          onProgress: (int progress) {
            setState(() {
              _progress = progress / 100;
            });
          },
          onPageStarted: (String url) {},
          onPageFinished: (String url) {},
          onWebResourceError: (WebResourceError error) {},
          onNavigationRequest: (NavigationRequest request) {
            print(request.url);
            if (request.url.startsWith('http://localhost:8080')) {
              setState(() {
                _isLoadingPage = true;
              });
              return NavigationDecision.prevent;
            }
            return NavigationDecision.navigate;
          },
        ),
      )
      ..loadRequest(Uri.parse('http://10.0.2.2:8080/api/auth/google'));
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    if (_isLoadingPage) {
      Navigator.pop(context);
    }
    final theme = Theme.of(context);
    return Scaffold(
        appBar: AppBar(
          title: const Text('Flutter Simple Example'),
          bottom: PreferredSize(
            preferredSize: const Size.fromHeight(6.0),
            child: LinearProgressIndicator(
              backgroundColor: theme.colorScheme.onPrimary,
              valueColor:
                  AlwaysStoppedAnimation<Color>(theme.colorScheme.primary),
              value: _progress,
            ),
          ),
        ),
        body: WebViewWidget(
          controller: _controller,
        ));
  }
}