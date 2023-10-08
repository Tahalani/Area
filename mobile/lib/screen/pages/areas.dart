import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class MyAreas extends StatefulWidget {
  final String token;
  const MyAreas({Key? key, required this.token}) : super(key: key);

  @override
  _MyAreasState createState() => _MyAreasState();
}

class Services {
  final int id = 0;
  final String serviceName;
  final List<Action> actionName;
  final List<Reaction> reactionName;
  final Image image;

  Services({
    required this.serviceName,
    required this.actionName,
    required this.reactionName,
    required this.image,
  });
}

class Action {
  final String actionName;
  final List<String>? actionParameters;

  Action({
    required this.actionName,
    this.actionParameters,
  });
}

class Reaction {
  final String reactionName;
  final List<String>? reactionParameters;

  Reaction({
    required this.reactionName,
    this.reactionParameters,
  });
}

List<Services> services = [
  Services(
    serviceName: "Twitter",
    actionName: [
      Action(
        actionName: "TW Action 1",
        actionParameters: [
          "TW Action 1 Param 1",
          "TW Action 1 Param 2",
        ],
      ),
      Action(
        actionName: "TW Action 2",
        actionParameters: [
          "TW Action 2 Param 1",
        ],
      )
    ],
    reactionName: [
      Reaction(
        reactionName: "TW Reaction 1",
        reactionParameters: [
          "TW Reaction 1 Param 1",
          "TW Reaction 1 Param 2",
        ],
      ),
      Reaction(
        reactionName: "TW Reaction 2",
        reactionParameters: [
          "TW Reaction 2 Param 1",
        ],
      )
    ],
    image: Image.asset("assets/images/twitter.png", height: 30, width: 30),
  ),
  Services(
    serviceName: "Facebook",
    actionName: [
      Action(
        actionName: "FB Action 1",
      ),
      Action(
        actionName: "FB Action 2",
      ),
      Action(
        actionName: "FB Action 3",
      )
    ],
    reactionName: [
      Reaction(
        reactionName: "FB Reaction 1",
      ),
      Reaction(
        reactionName: "FB Reaction 2",
      ),
    ],
    image: Image.asset(
      "assets/images/facebook.png",
      height: 30,
      width: 30,
    ),
  ),
  Services(
    serviceName: "Google",
    actionName: [
      Action(
        actionName: "Google Action 1",
      ),
      Action(
        actionName: "Google Action 2",
      ),
    ],
    reactionName: [
      Reaction(
        reactionName: "Google Reaction 1",
      ),
    ],
    image: Image.asset(
      "assets/images/google.png",
      height: 30,
      width: 30,
    ),
  ),
  Services(
    serviceName: "Discord",
    actionName: [
      Action(
        actionName: "Action Discord 1",
        actionParameters: [
          "Action Discord 1 Param 1",
          "Action Discord 1 Param 2",
        ],
      ),
      Action(
        actionName: "Action Discord 2",
        actionParameters: [
          "Action Discord 2 Param 1",
        ],
      ),
    ],
    reactionName: [
      Reaction(
        reactionName: "Reaction Discord 1",
        reactionParameters: [
          "Reaction Discord 1 Param 1",
          "Reaction Discord 1 Param 2",
        ],
      ),
      Reaction(
        reactionName: "Reaction Discord 2",
        reactionParameters: [
          "Reaction Discord 2 Param 1",
        ],
      ),
    ],
    image: Image.asset(
      "assets/images/discord.png",
      height: 30,
      width: 30,
    ),
  ),
];

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

class _MyAreasState extends State<MyAreas> {
  List<SOCIAL_SERVICES> scocialService = [];
  List<ACTION> action = [];
  List<Field> args_action = [];
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
              controller: TextEditingController(text: "kevin"),
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
        child: Card(
          elevation: 5,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(15),
            side: const BorderSide(
              color: Color.fromRGBO(30, 41, 133, 1),
              width: 1,
            ),
          ),
          child: Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: TextField(
                    controller: areaTitleController,
                    decoration: const InputDecoration(
                      hintText: 'Titre AREA',
                    ),
                  ),
                ),
                FieldServiceAction(),
                if (selectedService1 != null) FieldAction(),
                // if (selectedAction != null) FieldServiceReaction(),
                // if (selectedService2 != null)
                //   FieldReaction()
                // else
                //   const SizedBox(),
              ],
            ),
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
              hint: const Text('Sélectionnez un service'),
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
              hint: const Text('Sélectionnez une action'),
            ),
          ),
          for (ACTION action in action)
            Visibility(
              visible: selectedAction == action.description,
              child:
                Column(
                  children: [
                    FieldActionParameters(action),
                  ],
                ),
              ),
        ],
      ),
    );
  }

  Widget FieldServiceReaction() {
    return Card(
      elevation: 5,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(15),
      ),
      child: Column(
        children: [
          ListTile(
            title: DropdownButton<String>(
              value: selectedService2,
              onChanged: (String? newValue) {
                setState(() {
                  selectedService2 = newValue;
                  selectedReaction = null;
                });
              },
              items: services.map<DropdownMenuItem<String>>(
                (Services service) {
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
              hint: const Text('Sélectionnez un service'),
            ),
          ),
        ],
      ),
    );
  }

  Widget FieldReaction() {
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
              items: services
                  .firstWhere(
                      (service) => service.serviceName == selectedService2)
                  .reactionName
                  .map<DropdownMenuItem<String>>(
                (Reaction reaction) {
                  return DropdownMenuItem<String>(
                    value: reaction.reactionName,
                    child: Text(reaction.reactionName),
                  );
                },
              ).toList(),
              isExpanded: true,
              style: const TextStyle(fontSize: 16, color: Colors.black),
              hint: const Text('Sélectionnez une reaction'),
            ),
          ),
        ],
      ),
    );
  }
}
