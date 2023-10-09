import 'package:flutter/material.dart';
import 'package:mobile/screen/component/dialoglogout.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class MyProfil extends StatefulWidget {
  final String token;
  const MyProfil({Key? key, required this.token}) : super(key: key);

  @override
  _MyProfilState createState() => _MyProfilState();
}

class UserProfile {
  final String lastName;
  final String firstName;
  final String email;
  final String password;

  UserProfile({
    required this.lastName,
    required this.firstName,
    required this.email,
    required this.password,
  });
}

class _MyProfilState extends State<MyProfil> {
  Future<UserProfile> fetchUser(String token) async {
    var url = "http://884d1376-a185-41a0-a373-f1359376749e.pub.instances.scw.cloud:8080/api/auth/profile";
    var headers = {'Authorization': 'Bearer ${widget.token}'};
    var response = await http.get(Uri.parse(url), headers: headers);
    if (response.statusCode == 200) {
      final user = jsonDecode(response.body);
      return UserProfile(
        lastName: user['name'],
        firstName: user['surname'],
        email: user['email'],
        password: "********",
      );
    } else {
      throw Exception('Failed to load user');
    }
  }

  final lastName = TextEditingController();
  final firstName = TextEditingController();
  final email = TextEditingController();
  final password = TextEditingController();
  UserProfile user = UserProfile(
    lastName: "",
    firstName: "",
    email: "",
    password: "",
  );
  bool _isHidden = true;
  @override
  void initState() {
    super.initState();
    fetchUser(widget.token).then((value) {
      setState(() {
        user = value;
      });
    });
  }

  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Profil'),
        backgroundColor: Colors.black,
        actions: [
          IconButton(
              onPressed: () {
                showLogoutConfirmationDialog(context);
              },
              icon: const Icon(Icons.logout))
        ],
      ),
      backgroundColor: const Color.fromRGBO(254, 254, 241, 1),
      body: Container(
        padding: const EdgeInsets.only(left: 15, top: 20, right: 15),
        child: GestureDetector(
          onTap: () {
            FocusScope.of(context).unfocus();
          },
          child: SingleChildScrollView(
            child: Card(
              elevation: 6,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(10.0),
                side: const BorderSide(
                  color: Color.fromRGBO(30, 41, 133, 1),
                  width: 1,
                ),
              ),
              child: Padding(
                padding: const EdgeInsets.all(20),
                child: Column(
                  children: [
                    Center(
                      child: Stack(
                        children: [
                          Container(
                            width: 130,
                            height: 130,
                            decoration: BoxDecoration(
                              border: Border.all(width: 4, color: Colors.white),
                              boxShadow: [
                                BoxShadow(
                                  spreadRadius: 2,
                                  blurRadius: 10,
                                  color: Colors.black.withOpacity(0.1),
                                )
                              ],
                              shape: BoxShape.circle,
                              image: null,
                            ),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 10),
                    buildTextField("Lastname", user.lastName, lastName, false),
                    buildTextField(
                        "Firstname", user.firstName, firstName, false),
                    buildTextField("Email", user.email, email, false),
                    buildTextField("Password", user.password, password, true),
                    const SizedBox(height: 30),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        OutlinedButton(
                          onPressed: () {
                            email.clear();
                            password.clear();
                            firstName.clear();
                            lastName.clear();
                          },
                          style: OutlinedButton.styleFrom(
                            padding: const EdgeInsets.symmetric(horizontal: 50),
                            backgroundColor: Colors.grey[200],
                            shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(20)),
                          ),
                          child: const Text(
                            "CANCEL",
                            style: TextStyle(
                              fontSize: 15,
                              letterSpacing: 2,
                              color: Colors.black,
                            ),
                          ),
                        ),
                        ElevatedButton(
                          onPressed: () {},
                          style: ElevatedButton.styleFrom(
                            backgroundColor: Colors.black,
                            padding: const EdgeInsets.symmetric(horizontal: 50),
                            shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(20)),
                          ),
                          child: const Text(
                            "SAVE",
                            style: TextStyle(
                              fontSize: 15,
                              letterSpacing: 2,
                              color: Colors.white,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget buildTextField(String label, String placeholder,
      TextEditingController controller, bool isPassword) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 30),
      child: TextField(
        controller: controller,
        obscureText: isPassword ? _isHidden : false,
        decoration: InputDecoration(
            suffixIcon: isPassword
                ? IconButton(
                    icon: Icon(
                      _isHidden ? Icons.visibility : Icons.visibility_off,
                      color: Colors.grey,
                    ),
                    onPressed: () {
                      setState(() {
                        _isHidden = !_isHidden;
                      });
                    },
                  )
                : null,
            contentPadding: const EdgeInsets.only(bottom: 5),
            labelText: label,
            floatingLabelBehavior: FloatingLabelBehavior.always,
            hintText: placeholder,
            hintStyle: const TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.bold,
              color: Colors.grey,
            )),
      ),
    );
  }
}
