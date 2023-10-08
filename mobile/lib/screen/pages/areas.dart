import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class MyAreas extends StatefulWidget {
  final String token;
  const MyAreas({Key? key, required this.token}) : super(key: key);

  @override
  _MyAreasState createState() => _MyAreasState();
}

class SOCIAL_SERVICES {
  final int id;
  final String serviceName;
  final Image image;

  SOCIAL_SERVICES({
    required this.id,
    required this.serviceName,
    required this.image,
  });
}

class Field {
  final String key;
  final String field;
  TextEditingController controller = TextEditingController();

  Field({
    required this.key,
    required this.controller,
    required this.field,
  });
}

class ACTION {
  final int id;
  final String description;
  final List<Field> fields;

  ACTION({
    required this.id,
    required this.description,
    required this.fields,
  });
}

class REACTION {
  final int id;
  final String description;
  final List<Field> fields;

  REACTION({
    required this.id,
    required this.description,
    required this.fields,
  });
}

class _MyAreasState extends State<MyAreas> {
  List<SOCIAL_SERVICES> scocialService = [];
  List<ACTION> action = [];
  List<Field> args_action = [];
  List<REACTION> reaction = [];
  List<Field> args_reaction = [];
  String? selectedService1;
  String? selectedAction;
  String? selectedService2;
  String? selectedReaction;
  TextEditingController areaTitleController = TextEditingController();

  Future<List<SOCIAL_SERVICES>> fetchServices(String token) {
    var url = "http://163.172.134.80:8080/api/services/get";
    var headers = {'Authorization': 'Bearer ${widget.token}'};
    return http.get(Uri.parse(url), headers: headers).then((response) {
      if (response.statusCode == 200) {
        final services = jsonDecode(response.body);
        return services.map<SOCIAL_SERVICES>((service) {
          return SOCIAL_SERVICES(
            id: service['id'],
            serviceName: service['name'],
            image: Image.network(
              service['logo_url'],
              height: 30,
              width: 30,
            ),
          );
        }).toList();
      } else {
        throw Exception('Failed to load services');
      }
    });
  }

  Future<List<ACTION>> fetchAction(String token, int serviceId) {
    List<Field> tmp = [];
    var url = "http://163.172.134.80:8080/api/actions/get?serviceId=$serviceId";
    var headers = {'Authorization': 'Bearer ${widget.token}'};
    return http.get(Uri.parse(url), headers: headers).then((response) {
      if (response.statusCode == 200) {
        final actions = jsonDecode(response.body);
        return actions.map<ACTION>((action) {
          final args = jsonDecode(action['args_action']);
          Map<String, dynamic> myMap = args[0];
          myMap.forEach((key, value) {
            tmp.add(Field(
              key: key,
              controller: TextEditingController(),
              field: value,
            ));
          });
          args_action = tmp;
          tmp = [];
          return ACTION(
            id: action['id'],
            description: action['description'],
            fields: args_action,
          );
        }).toList();
      } else {
        throw Exception('Failed to load actions');
      }
    });
  }

  Future<List<REACTION>> fetchReaction(String token) {
    List<Field> tmp = [];
    var url = "http://163.172.134.80:8080/api/reactions/get";
    var headers = {'Authorization': 'Bearer ${widget.token}'};
    return http.get(Uri.parse(url), headers: headers).then((response) {
      if (response.statusCode == 200) {
        final reactions = jsonDecode(response.body);
        return reactions.map<REACTION>((reaction) {
          final args = jsonDecode(reaction['args_reaction']);
          Map<String, dynamic> myMap = args[0];
          myMap.forEach((key, value) {
            tmp.add(Field(
              key: key,
              controller: TextEditingController(),
              field: value,
            ));
          });
          args_reaction = tmp;
          tmp = [];
          return REACTION(
            id: reaction['id'],
            description: reaction['description'],
            fields: args_reaction,
          );
        }).toList();
      } else {
        throw Exception('Failed to load reactions');
      }
    });
  }

  @override
  void initState() {
    super.initState();
    fetchServices(widget.token).then((value) {
      setState(() {
        scocialService = value;
      });
    });
  }

  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color.fromRGBO(254, 254, 241, 1),
      appBar: AppBar(
        title: const Text('Areas'),
        backgroundColor: Colors.black,
        actions: [
          IconButton(
            onPressed: () {},
            icon: const Icon(Icons.add),
          ),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Padding(
                padding: const EdgeInsets.all(16.0),
                child: TextField(
                  controller: areaTitleController,
                  decoration: const InputDecoration(
                    hintText: 'AREA\'s title',
                  ),
                ),
              ),
              const Text(
                "IF",
                style: TextStyle(
                  fontSize: 32,
                  fontWeight: FontWeight.bold,
                ),
              ),
              FieldServiceAction(),
              if (selectedService1 != null) FieldAction(),
              const Text(
                "THEN",
                style: TextStyle(
                  fontSize: 32,
                  fontWeight: FontWeight.bold,
                ),
              ),
              if (selectedAction != null) FieldReaction(),
            ],
          ),
        ),
      ),
    );
  }

  Widget FieldServiceAction() {
    return Card(
      elevation: 5,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(15),
      ),
      child: Column(
        children: [
          ListTile(
            title: DropdownButton<String>(
              value: selectedService1,
              onChanged: (String? newValue) {
                setState(() {
                  selectedService1 = newValue;
                  selectedAction = null;
                  selectedReaction = null;
                });
              },
              items: scocialService.map<DropdownMenuItem<String>>(
                (SOCIAL_SERVICES service) {
                  return DropdownMenuItem<String>(
                    value: service.serviceName,
                    child: Row(
                      children: [
                        service.image,
                        const SizedBox(width: 8),
                        Text(service.serviceName),
                      ],
                    ),
                  );
                },
              ).toList(),
              isExpanded: true,
              style: const TextStyle(fontSize: 16, color: Colors.black),
              hint: const Text('Select a service'),
            ),
          ),
        ],
      ),
    );
  }

  Widget FieldActionParameters(ACTION action) {
    if (action.fields.isEmpty) {
      return const SizedBox();
    }
    return Column(
      children: [
        for (Field field in action.fields)
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: TextField(
              decoration: InputDecoration(
                hintText: field.field,
              ),
              onChanged: (text) {
                setState(() {
                  field.controller.text = text;
                });
              },
            ),
          ),
      ],
    );
  }

  Widget FieldAction() {
    fetchAction(
            widget.token,
            scocialService
                .firstWhere(
                    (service) => service.serviceName == selectedService1)
                .id)
        .then((value) {
      setState(() {
        action = value;
      });
    });
    return Card(
      elevation: 5,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(15),
      ),
      child: Column(
        children: [
          ListTile(
            subtitle: DropdownButton<String>(
              value: selectedAction,
              onChanged: (String? newValue) {
                setState(() {
                  selectedAction = newValue;
                  selectedReaction = null;
                });
              },
              items: action.map<DropdownMenuItem<String>>(
                (ACTION action) {
                  return DropdownMenuItem<String>(
                    value: action.description,
                    child: Text(action.description),
                  );
                },
              ).toList(),
              isExpanded: true,
              style: const TextStyle(fontSize: 16, color: Colors.black),
              hint: const Text('Select an action'),
            ),
          ),
          for (ACTION action in action)
            Visibility(
              visible: selectedAction == action.description,
              child: Column(
                children: [
                  FieldActionParameters(action),
                ],
              ),
            ),
        ],
      ),
    );
  }

  Widget FieldRectionParameters(REACTION reaction) {
    if (reaction.fields.isEmpty) {
      return const SizedBox();
    }
    return Column(
      children: [
        for (Field field in reaction.fields)
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: TextField(
              decoration: InputDecoration(
                hintText: field.field,
              ),
              onChanged: (text) {
                setState(() {
                  field.controller.text = text;
                });
              },
            ),
          ),
      ],
    );
  }

  Widget FieldReaction() {
    fetchReaction(widget.token).then((value) {
      setState(() {
        reaction = value;
      });
    });
    return Card(
      elevation: 5,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(15),
      ),
      child: Column(
        children: [
          ListTile(
            subtitle: DropdownButton<String>(
              value: selectedReaction,
              onChanged: (String? newValue) {
                setState(() {
                  selectedReaction = newValue;
                });
              },
              items: reaction.map<DropdownMenuItem<String>>(
                (REACTION reaction) {
                  return DropdownMenuItem<String>(
                    value: reaction.description,
                    child: Text(reaction.description),
                  );
                },
              ).toList(),
              isExpanded: true,
              style: const TextStyle(fontSize: 16, color: Colors.black),
              hint: const Text('Select a reaction'),
            ),
          ),
          for (REACTION reaction in reaction)
            Visibility(
              visible: selectedReaction == reaction.description,
              child: Column(
                children: [
                  FieldRectionParameters(reaction),
                ],
              ),
            ),
        ],
      ),
    );
  }
}
