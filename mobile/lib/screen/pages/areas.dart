import 'package:flutter/material.dart';

class MyAreas extends StatefulWidget {
  final String token;
  const MyAreas({Key? key, required this.token}) : super(key: key);

  @override
  _MyAreasState createState() => _MyAreasState();
}

class _MyAreasState extends State<MyAreas> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color.fromRGBO(254, 254, 241, 1),
      appBar: AppBar(
        title: const Text('Areas'),
        backgroundColor: Colors.black,
        actions: [
          IconButton(
              onPressed: () {
                print("Add Area");
              },
              icon: const Icon(Icons.add))
        ],
      ),
      body: null,
    );
  }
}
